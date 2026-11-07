import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function HomeCarousel() {
  return (
    <Carousel className="w-full max-w-[18rem] px-10 sm:max-w-xs md:max-w-sm md:px-12 lg:max-w-none">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="lg:basis-1/2">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0 md:size-10 md:[&_svg]:size-5" />
      <CarouselNext className="right-0 md:size-10 md:[&_svg]:size-5" />
    </Carousel>
  )
}
