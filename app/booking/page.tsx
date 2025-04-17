import BookingForm from "@/components/booking-form"

export default function BookingPage() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Book Your Session</h1>
            <p className="mt-4 text-lg text-gray-500">
              Take the first step towards transformation by scheduling your session with Hagar Moharam.
            </p>
          </div>

          <BookingForm />
        </div>
      </div>
    </div>
  )
}
