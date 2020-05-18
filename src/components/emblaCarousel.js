import React, { useEffect , useState , useCallback } from "react";
import { useEmblaCarousel } from "embla-carousel-react";
import styled from "@emotion/styled";
import { NextButton, PrevButton } from "./carouselButtons";

const Container = styled.div`
  margin: 40px 0px 5px 0px;
  padding: 20px 0px 20px 0px;
  background-color: #eeeeee;
  border-radius: 4px;
`

const EmblaContainer = styled.div`
  display: flex;
  padding: 10px;
  width: 110%;
  postion:absolute;
`

const SlideContainer = styled.div`
  flex: 0 0 auto;
  width: 60%;
  position:relative;
  @media (max-width: 600px) {
    width: 80%;
  }
`
const Slide = styled.div`
  flex: 0 0 auto;
  width: 80%;
  height: auto;
  width: auto;
`

const ButtonContainer = styled.div`
display: flex;
justify-content: space-between;
margin: auto 50px;
`

const EmblaCarouselComponent = ({ children }) => {
  const [EmblaCarouselReact, embla] = useEmblaCarousel({
    loop: false,
    dragFree: true,
    startIndex: 6,
  })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);


  useEffect(() => {
    const onSelect = () => { 
      setSelectedIndex(embla.selectedScrollSnap())
      setNextBtnEnabled(embla.canScrollNext())
      setPrevBtnEnabled(embla.canScrollPrev())
    }
    if (embla) {
      embla.on("select", onSelect);
      onSelect();
      embla.on("select", () => {
        console.log(`Current index is ${embla.selectedScrollSnap()}`)
      })
    }
  }, [embla])
  
  console.group("EMBLA");
    console.log(`prevBtnEn: ${prevBtnEnabled}`)
    console.log(`nextBtnEn: ${nextBtnEnabled}`)
    console.log(`slecedIndex: ${selectedIndex}`)
  console.groupEnd()

  console.log(embla)

  return (
    <>
    <Container>
      <EmblaCarouselReact options={{dragFree: `true`}}>
        <EmblaContainer>
          {children.map((child, index) => (
            <SlideContainer key={index}>
              <Slide>{child}</Slide>
            </SlideContainer>
          ))}
        </EmblaContainer>
      </EmblaCarouselReact>
    </Container>
      <ButtonContainer>      
      <PrevButton onClick={useCallback(() => embla.scrollPrev(), [embla])} enabled={prevBtnEnabled}/>
      <NextButton onClick={useCallback(() => embla.scrollNext(), [embla])} enabled={nextBtnEnabled}/>
      </ButtonContainer>
    </>
  )
}

export default EmblaCarouselComponent
