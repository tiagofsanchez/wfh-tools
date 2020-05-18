import React, { useEffect } from "react";
import { useEmblaCarousel } from "embla-carousel-react";
import styled from "@emotion/styled";

const Container = styled.div`
  margin: 40px auto;
  padding: 20px 0px 20px 0px;
  background-color: #eeeeee;
  border-radius: 4px;
`

const EmblaContainer = styled.div`
  display: flex;
  padding: 10px;
`

const SlideContainer = styled.div`
  flex: 0 0 auto;
  width: 60%;
  position: relative;
  @media (max-width: 600px) {
    width: 80%;
  }
`
const Slide = styled.div`
  height: auto;
  width: auto;
  margin-left: 5px;
`

const EmblaCarouselComponent = ({ children }) => {
  const [EmblaCarouselReact, embla] = useEmblaCarousel({
    loop: false,
  })

  useEffect(() => {
    if (embla) {
      embla.on("select", () => {
        console.log(`Current index is ${embla.selectedScrollSnap()}`)
      })
    }
  }, [embla])
  

  return (
    <Container>
      <EmblaCarouselReact>
        <EmblaContainer>
          {children.map((child, index) => (
            <SlideContainer key={index}>
              <Slide>{child}</Slide>
            </SlideContainer>
          ))}
        </EmblaContainer>
      </EmblaCarouselReact>
    </Container>
  )
}

export default EmblaCarouselComponent
