import { ReactNode } from 'react'

import NavLinkStyle from './index.styles'

type Props = {
  href?: string
  children: ReactNode
}


const NavLink = (props: Props) => {

  function smoothScrollTo(endX: number, endY: number, duration: number = 2) {
    const startX = window.scrollX || window.pageXOffset
    const startY = window.scrollY || window.pageYOffset
    const distanceX = endX - startX
    const distanceY = endY - startY
    const startTime = new Date().getTime()
  
    duration = typeof duration !== 'undefined' ? duration : 400
  
    // Easing function
    const easeInOutQuart = (time: number, from: number, distance: number, duration: number) => {
      if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from
      return -distance / 2 * ((time -= 2) * time * time * time - 2) + from
    }
  
    const timer = setInterval(() => {
      const time = new Date().getTime() - startTime
      const newX = easeInOutQuart(time, startX, distanceX, duration)
      const newY = easeInOutQuart(time, startY, distanceY, duration)
      if (time >= duration)
        clearInterval(timer)
      else
        window.scroll(newX, newY)
    }, 1000 / 60) // 60 fps
  }

  const _click = () => {
    if (props.href) {
      const to = (document.querySelector(props.href) as HTMLDivElement).offsetTop - 20
      smoothScrollTo(0, to, 800)
    }
  }

  return (
    <NavLinkStyle onClick={ _click }>{ props.children }</NavLinkStyle>
  )
}


export default NavLink