import React from "react"
import EmblaCarousel from "./emblaCarousel"
import CompaniesSample from "./companiesSample"
import useWindowWidth from '../hooks/useWidth';

const Carousel = ({ icons }) => {
  const width = useWindowWidth();
  return (
    <EmblaCarousel>
      {icons.map(type => (
        <CompaniesSample
          key={type.name}
          icon={type.icon}
          title={type.name}
          description={type.description}
          windowWidth={width}
        />
      ))}
    </EmblaCarousel>
  )
}

export default Carousel
