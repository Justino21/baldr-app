export default function ShippingPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Shipping & Returns</h1>

      <div className="grid gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-baldr-yellow">Shipping Information</h2>
          <div className="space-y-4">
            <p>We offer free shipping on orders over $50 within the United States.</p>
            <p>Standard shipping (3-5 business days): $5.99</p>
            <p>Express shipping (2-3 business days): $12.99</p>
            <p>International shipping rates vary by country and will be calculated at checkout.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-baldr-yellow">Order Processing</h2>
          <div className="space-y-4">
            <p>Orders are typically processed within 1-2 business days.</p>
            <p>You will receive a confirmation email with tracking information once your order ships.</p>
            <p>Please allow 24-48 hours for tracking information to become available.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-baldr-yellow">Returns Policy</h2>
          <div className="space-y-4">
            <p>We offer a 30-day money-back guarantee on all unopened products.</p>
            <p>To initiate a return:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Log into your account and go to your order history</li>
              <li>Select the order you wish to return</li>
              <li>Click "Request Return" and follow the prompts</li>
              <li>Print the provided return shipping label</li>
              <li>Package your items securely and drop off at any authorized shipping location</li>
            </ol>
            <p>Refunds will be processed within 5-10 business days of receiving your return.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-baldr-yellow">Damaged or Incorrect Items</h2>
          <div className="space-y-4">
            <p>If you receive damaged or incorrect items, please contact our customer service team within 48 hours of delivery.</p>
            <p>We will provide a prepaid shipping label and process your replacement or refund immediately.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-baldr-yellow">Contact Us</h2>
          <div className="space-y-4">
            <p>For any shipping or return-related questions, please contact our customer service team:</p>
            <p>Email: shipping@baldr.com</p>
            <p>Phone: 1-800-BALDR-123</p>
            <p>Hours: Monday-Friday, 9am-5pm EST</p>
          </div>
        </section>
      </div>
    </div>
  )
} 