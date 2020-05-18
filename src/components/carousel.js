import React from "react"
import EmblaCarousel from "./emblaCarousel"
import CompaniesSample from "./companiesSample"

const Carousel = ({ icons }) => {
  return (
    <EmblaCarousel>
      {icons.map(type => (
        <CompaniesSample
          key={type.name}
          icon={type.icon}
          title={type.name}
          description={type.description}
        />
      ))}
    </EmblaCarousel>
  )
}

export default Carousel
