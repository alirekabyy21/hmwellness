import Link from "next/link"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { workshopsContent } from "@/app/config"

export default function WorkshopsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">{workshopsContent.hero.title}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{workshopsContent.hero.description}</p>
      </div>

      {workshopsContent.workshops.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <div className="max-w-md mx-auto">
            <Calendar className="h-12 w-12 mx-auto text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
            <p className="text-gray-600 mb-6">
              We're currently planning exciting workshops to help you on your personal development journey. Sign up for
              our newsletter to be the first to know when new workshops are available.
            </p>
            <Button asChild>
              <Link href="/contact">Get Notified</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {workshopsContent.workshops.map((workshop) => (
            <Card key={workshop.id} className="overflow-hidden flex flex-col h-full">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={workshop.image || "/placeholder.svg"}
                  alt={workshop.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-primary">{workshop.price}</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle>{workshop.title}</CardTitle>
                <CardDescription>{workshop.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 flex-grow">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <span>{workshop.date}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  <span>{workshop.time}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <span>{workshop.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-primary" />
                  <span>
                    {workshop.spotsLeft} spots left out of {workshop.spots}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/workshops/${workshop.id}`}>Register Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
