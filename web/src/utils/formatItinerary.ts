export function formatItinerary(itinerary: string) {
    while (itinerary.slice(0, 2) === "\n") {
      itinerary = itinerary.slice(2)
    }
    return itinerary
}