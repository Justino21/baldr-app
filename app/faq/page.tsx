import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is BalDr?</AccordionTrigger>
          <AccordionContent>
            BalDr is a holistic, budget-friendly hair care solution powered by AI. Our platform provides personalized recommendations, progress tracking, and 24/7 virtual support to help you achieve your hair care goals.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How does the AI chat feature work?</AccordionTrigger>
          <AccordionContent>
            Our AI chat feature provides instant support and personalized recommendations based on your hair type, concerns, and goals. Simply ask questions about your hair care routine, and our AI will provide detailed, customized advice.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>How do I track my hair growth progress?</AccordionTrigger>
          <AccordionContent>
            You can track your hair growth progress by uploading photos and documenting your journey in our Progress Tracker. The tool helps you visualize your progress over time and provides insights on what's working best for your hair.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
          <AccordionContent>
            We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely through our payment partners.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionContent>
            We offer a 30-day money-back guarantee on all unopened products. If you're not satisfied with your purchase, please contact our customer service team for assistance with returns.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>How do I contact customer support?</AccordionTrigger>
          <AccordionContent>
            You can reach our customer support team through the Contact Us page, via email at support@baldr.com, or through our AI chat feature which is available 24/7.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
} 