interface PageHeaderProps {
  title: string
  description?: string
  className?: string
}

export function PageHeader({ title, description, className = "" }: PageHeaderProps) {
  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-bg-light to-bg-medium ${className}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">{title}</h1>
            {description && (
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
