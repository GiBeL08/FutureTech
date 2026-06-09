import ResourcesHero from '../components/ResourcesHero';
import ReportsAnalysisSection from '../components/ReportsAnalysisSection';
import CTASection from '../components/CTASection';
import { getResources, getSiteStats } from '@/lib/db';

export default async function Resources() {
  const [stats, resourcesData] = await Promise.all([
    getSiteStats('resources'),
    getResources(),
  ]);

  const heroStats = stats.map((s) => ({ value: s.value, label: s.label }));

  return (
    <div className="bg-[#141414]">
      <ResourcesHero stats={heroStats} />
      <ReportsAnalysisSection
        highlights={resourcesData.highlights}
        resources={resourcesData.resources}
      />
      <CTASection />
    </div>
  );
}
