import ContactPage from '../components/ContactPage';
import CTASection from '../components/CTASection';
import { getFaqs } from '@/lib/db';

export default async function Contact() {
  const faqs = await getFaqs();

  return (
    <div className="bg-[#141414]">
      <ContactPage faqs={faqs} />
      <CTASection />
    </div>
  );
}
