'use client';

import { useState } from 'react';
import { ArrowUpRight, Headphones, Mail, MapPin, Plus, Twitter, Github, Linkedin } from 'lucide-react';
import { submitContact } from '@/lib/api-client';

type FaqItem = { q: string; a: string };

type Props = {
  faqs: FaqItem[];
};

export default function ContactPage({ faqs }: Props) {
  const [open, setOpen] = useState<number | null>(0);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    agree: false,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.agree) {
      setStatus('error');
      setFeedback('Please agree to the Terms & Conditions and Privacy Policy.');
      return;
    }
    setStatus('loading');
    setFeedback('');
    try {
      await submitContact({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone || undefined,
        message: form.message,
        agree: true,
      });
      setStatus('success');
      setFeedback('Your message has been sent successfully. We will contact you soon.');
      setForm({ firstName: '', lastName: '', email: '', phone: '', message: '', agree: false });
    } catch (err) {
      setStatus('error');
      setFeedback(err instanceof Error ? err.message : 'Failed to send message.');
    }
  }

  return (
    <div className="bg-[#141414]">
      <section className="bg-[#141414] text-white border-b border-[#262626]">
        <div className="max-w-[1536px] mx-auto border-x border-[#262626]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-[#262626]">
            <div className="p-6 lg:p-10 border-b md:border-b-0 md:border-r border-[#262626]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-white text-lg font-semibold">General Inquiries</h3>
                  <p className="text-[#7E7E81] text-sm font-light mt-2 leading-relaxed">
                    For general inquiries, please contact us at info@futuretech.ai
                  </p>
                </div>
                <div className="w-11 h-11 rounded-full bg-[#141414] border border-[#262626] flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-[#FFD11A]" />
                </div>
              </div>
              <a
                href="mailto:info@futuretech.ai"
                className="mt-6 w-full bg-[#1A1A1A] border border-[#262626] rounded-[12px] px-4 py-3 inline-flex items-center justify-between text-[#98989A] hover:text-white hover:bg-[#202022] transition-colors"
              >
                <span className="text-sm font-medium">info@futuretech.ai</span>
                <ArrowUpRight size={18} className="text-[#FFD11A]" />
              </a>
            </div>

            <div className="p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#262626] md:border-r">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-white text-lg font-semibold">Technical Support</h3>
                  <p className="text-[#7E7E81] text-sm font-light mt-2 leading-relaxed">
                    Need technical help? Contact our support team.
                  </p>
                </div>
                <div className="w-11 h-11 rounded-full bg-[#141414] border border-[#262626] flex items-center justify-center flex-shrink-0">
                  <Headphones size={18} className="text-[#FFD11A]" />
                </div>
              </div>
              <a
                href="mailto:support@futuretech.ai"
                className="mt-6 w-full bg-[#1A1A1A] border border-[#262626] rounded-[12px] px-4 py-3 inline-flex items-center justify-between text-[#98989A] hover:text-white hover:bg-[#202022] transition-colors"
              >
                <span className="text-sm font-medium">support@futuretech.ai</span>
                <ArrowUpRight size={18} className="text-[#FFD11A]" />
              </a>
            </div>

            <div className="p-6 lg:p-10 border-b md:border-b-0 md:border-r border-[#262626]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-white text-lg font-semibold">Our Office</h3>
                  <p className="text-[#7E7E81] text-sm font-light mt-2 leading-relaxed">
                    123 FutureTech Lane, Innovation City, Techland, 98765
                  </p>
                </div>
                <div className="w-11 h-11 rounded-full bg-[#141414] border border-[#262626] flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-[#FFD11A]" />
                </div>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full bg-[#1A1A1A] border border-[#262626] rounded-[12px] px-4 py-3 inline-flex items-center justify-between text-[#98989A] hover:text-white hover:bg-[#202022] transition-colors"
              >
                <span className="text-sm font-medium">Get Directions</span>
                <ArrowUpRight size={18} className="text-[#FFD11A]" />
              </a>
            </div>

            <div className="p-6 lg:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-white text-lg font-semibold">Connect with Us</h3>
                  <p className="text-[#7E7E81] text-sm font-light mt-2 leading-relaxed">
                    Follow us on social media for updates and news.
                  </p>
                </div>
                <div className="w-11 h-11 rounded-full bg-[#141414] border border-[#262626] flex items-center justify-center flex-shrink-0">
                  <ArrowUpRight size={18} className="text-[#FFD11A]" />
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3">
                {[Twitter, Github, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-11 h-11 rounded-full bg-[#1A1A1A] border border-[#262626] flex items-center justify-center hover:bg-[#202022] transition-colors"
                  >
                    <Icon size={18} className="text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr]">
            <div className="lg:border-r border-[#262626]">
              <div className="p-6 lg:p-10 border-b border-[#262626]">
                <div className="w-12 h-12 rounded-[12px] bg-[#141414] border border-[#262626] flex items-center justify-center mb-6">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFD11A]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFD11A] ml-2 opacity-60" />
                </div>
                <h2 className="text-[28px] lg:text-[34px] font-semibold leading-tight">
                  Get in Touch with Us
                </h2>
              </div>

              <div className="p-6 lg:p-10">
                <div className="w-12 h-12 rounded-[12px] bg-[#141414] border border-[#262626] flex items-center justify-center mb-6">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFD11A]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFD11A] ml-2 opacity-60" />
                </div>
                <h3 className="text-white text-xl font-semibold leading-tight">Asked question</h3>
                <p className="text-[#7E7E81] text-sm font-light mt-3 leading-relaxed">
                  If the question is not available in our FAQ section, feel free to contact us
                  personally, we will be happy to help you.
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="p-6 lg:p-10 border-b border-[#262626]">
                <form
                  onSubmit={handleSubmit}
                  className="bg-[#1A1A1A] border border-[#262626] rounded-[18px] p-6 lg:p-8"
                >
                  <h3 className="text-white text-xl font-semibold">Feedback</h3>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[#7E7E81] text-xs font-light">First Name</label>
                      <input
                        required
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        className="bg-[#141414] border border-[#262626] rounded-[10px] px-4 py-3 text-sm text-white outline-none focus:border-[#3a3a3a]"
                        placeholder="Enter First Name"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[#7E7E81] text-xs font-light">Last Name</label>
                      <input
                        required
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        className="bg-[#141414] border border-[#262626] rounded-[10px] px-4 py-3 text-sm text-white outline-none focus:border-[#3a3a3a]"
                        placeholder="Enter Last Name"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[#7E7E81] text-xs font-light">Email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="bg-[#141414] border border-[#262626] rounded-[10px] px-4 py-3 text-sm text-white outline-none focus:border-[#3a3a3a]"
                        placeholder="Enter your Email"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[#7E7E81] text-xs font-light">Phone</label>
                      <input
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="bg-[#141414] border border-[#262626] rounded-[10px] px-4 py-3 text-sm text-white outline-none focus:border-[#3a3a3a]"
                        placeholder="Enter Phone Number"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-2">
                    <label className="text-[#7E7E81] text-xs font-light">Message</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="bg-[#141414] border border-[#262626] rounded-[10px] px-4 py-3 text-sm text-white outline-none focus:border-[#3a3a3a] min-h-[120px] resize-none"
                      placeholder="Enter your Message"
                    />
                  </div>

                  {feedback && (
                    <p
                      className={`mt-4 text-sm ${status === 'error' ? 'text-red-400' : 'text-[#FFD11A]'}`}
                    >
                      {feedback}
                    </p>
                  )}

                  <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <label className="inline-flex items-center gap-3 text-[#7E7E81] text-xs font-light">
                      <input
                        type="checkbox"
                        checked={form.agree}
                        onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                        className="accent-[#FFD11A] w-4 h-4"
                      />
                      I agree with Terms of Use and Privacy Policy
                    </label>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="bg-[#FFD11A] text-black px-6 py-3 rounded-[10px] text-sm font-medium hover:brightness-95 transition disabled:opacity-60"
                    >
                      {status === 'loading' ? 'Sending...' : 'Send'}
                    </button>
                  </div>
                </form>
              </div>

              <div className="p-6 lg:p-10">
                <div className="bg-[#1A1A1A] border border-[#262626] rounded-[18px] overflow-hidden">
                  <div className="p-6 lg:p-8 border-b border-[#262626]">
                    <h3 className="text-white text-xl font-semibold">FAQ&apos;s</h3>
                    <p className="text-[#7E7E81] text-sm font-light mt-2">
                      Still you have any questions? Contact our Team via{' '}
                      <a href="mailto:support@futuretech.ai" className="text-[#FFD11A] hover:underline">
                        support@futuretech.ai
                      </a>
                    </p>
                  </div>

                  <div className="divide-y divide-[#262626]">
                    {faqs.map((item, idx) => {
                      const isOpen = open === idx;
                      return (
                        <button
                          key={item.q}
                          type="button"
                          onClick={() => setOpen((v) => (v === idx ? null : idx))}
                          className="w-full text-left p-6 lg:p-8 hover:bg-[#202022]/40 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-6">
                            <div className="min-w-0">
                              <p className="text-white text-sm lg:text-base font-medium">{item.q}</p>
                              {isOpen && (
                                <p className="text-[#7E7E81] text-sm font-light leading-relaxed mt-3">
                                  {item.a}
                                </p>
                              )}
                            </div>
                            <div className="w-9 h-9 rounded-full bg-[#141414] border border-[#262626] flex items-center justify-center flex-shrink-0">
                              <Plus
                                size={16}
                                className={`text-[#FFD11A] transition-transform ${isOpen ? 'rotate-45' : ''}`}
                              />
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
