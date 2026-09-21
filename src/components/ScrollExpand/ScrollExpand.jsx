
import { useCallback, useEffect, useRef } from 'react'
import './ScrollExpand.css'

const clamp = (v, a, b) => Math.min(Math.max(v, a), b)

const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1)
  return t * t * (3 - 2 * t)
}

const ScrollExpand = ({
  src = '',
  mediaType = 'image',
  poster = '',
  alt = '',
  title = '',
  scrollHint = '',
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  useWindowScroll = false,
  enabled = true,
  children,
  className = '',
  style,
  ...rest
}) => {
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const stageRef = useRef(null)
  const frameRef = useRef(null)
  const mediaRef = useRef(null)
  const titleRef = useRef(null)
  const overlayRef = useRef(null)
  const scrimRef = useRef(null)
  const hintRef = useRef(null)

  const propsRef = useRef({})
  propsRef.current = {
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled
  }

  const applyProgress = useCallback((progress) => {
    const frame = frameRef.current
    const media = mediaRef.current

    if (!frame || !media) return

    const c = propsRef.current
    const p = clamp(progress, 0, 1)
    const eased = smoothstep(0, 1, p)

    const width = c.startWidth + (100 - c.startWidth) * eased
    const height = c.startHeight + (100 - c.startHeight) * eased
    const insetX = Math.max(0, (100 - width) / 2)
    const insetY = Math.max(0, (100 - height) / 2)
    const radius = c.startRadius + (c.endRadius - c.startRadius) * eased

    frame.style.clipPath = `inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${radius}px)`
    media.style.transform = `scale(${c.mediaZoom + (1 - c.mediaZoom) * eased})`

    if (scrimRef.current) {
      scrimRef.current.style.opacity = `${c.overlayScrim * eased}`
    }

    if (titleRef.current) {
      const out = smoothstep(0.4, 0.88, p)
      titleRef.current.style.opacity = `${1 - out}`
      titleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0) scale(${1 + 0.06 * out})`
    }

    if (hintRef.current) {
      const gone = smoothstep(0, 0.12, p)
      hintRef.current.style.opacity = `${1 - gone}`
      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`
    }

    if (overlayRef.current) {
      const reveal = smoothstep(0.68, 1, p)
      overlayRef.current.style.opacity = `${reveal}`
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - reveal)}px, 0)`
      overlayRef.current.style.pointerEvents = reveal > 0.98 ? 'auto' : 'none'
    }
  }, [])

  useEffect(() => {
    const root = rootRef.current
    const track = trackRef.current
    const stage = stageRef.current

    if (!root || !track || !stage) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    let current = 0
    let target = 0
    let stageHeight = 0
    let running = false

    const measure = () => {
      const c = propsRef.current
      stageHeight = c.useWindowScroll ? window.innerHeight : root.clientHeight

      if (stageHeight <= 0) return

      stage.style.height = `${stageHeight}px`

      const totalDistance =
        1 + Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance)

      track.style.height = `${stageHeight * totalDistance}px`

      const width = root.clientWidth || stageHeight
      stage.style.setProperty(
        '--se-title-size',
        `${clamp(width * 0.075, 20, 84)}px`
      )
    }

    const readProgress = () => {
      const c = propsRef.current

      if (!c.enabled) return 1

      const span = stageHeight * Math.max(0.01, c.scrollDistance)

      if (c.useWindowScroll) {
        const rootTop = root.getBoundingClientRect().top
        const distanceScrolled = window.innerHeight - rootTop

        return clamp(distanceScrolled / span, 0, 1)
      }

      return clamp(root.scrollTop / span, 0, 1)
    }

    const tick = () => {
      const c = propsRef.current
      const smoothingFactor =
        c.smoothing <= 0
          ? 1
          : 1 - Math.exp(-1 / (60 * c.smoothing))

      current += (target - current) * smoothingFactor

      if (Math.abs(target - current) < 0.0004) {
        current = target
        running = false
      }

      applyProgress(current)
      raf = running ? requestAnimationFrame(tick) : 0
    }

    const kick = () => {
      if (running) return

      running = true

      if (!raf) {
        raf = requestAnimationFrame(tick)
      }
    }

    const onScroll = () => {
      target = readProgress()

      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target
        applyProgress(current)
        return
      }

      kick()
    }

    const onResize = () => {
      measure()
      target = readProgress()
      current = target
      applyProgress(current)
    }

    measure()
    target = readProgress()
    current = target
    applyProgress(current)

    const scroller = useWindowScroll ? window : root

    scroller.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(root)

    return () => {
      if (raf) cancelAnimationFrame(raf)

      scroller.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      resizeObserver.disconnect()
    }
  }, [applyProgress, useWindowScroll])

  const media =
    mediaType === 'video' ? (
      <video
        ref={mediaRef}
        className="scroll-expand__media"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      <img
        ref={mediaRef}
        className="scroll-expand__media"
        src={src}
        alt={alt}
        draggable={false}
      />
    )

  return (
    <div
      ref={rootRef}
      className={`scroll-expand ${useWindowScroll ? '' : 'scroll-expand--scroller'} ${className}`.trim()}
      style={style}
      {...rest}
    >
      <div ref={trackRef} className="scroll-expand__track">
        <div ref={stageRef} className="scroll-expand__stage">
          <div ref={frameRef} className="scroll-expand__frame">
            {media}
            <div ref={scrimRef} className="scroll-expand__scrim" />

            {children && (
              <div ref={overlayRef} className="scroll-expand__overlay">
                {children}
              </div>
            )}
          </div>

          {title && (
            <div ref={titleRef} className="scroll-expand__title">
              {title}
            </div>
          )}

          {scrollHint && (
            <div ref={hintRef} className="scroll-expand__hint">
              {scrollHint}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ScrollExpand