import PodcastsHero from '../components/PodcastsHero';
import LatestPodcastEpisodes from '../components/LatestPodcastEpisodes';
import CTASection from '../components/CTASection';
import {
  getFeaturedPodcasts,
  getLatestPodcastEpisodes,
  getPodcastShows,
} from '@/lib/db';

export default async function Podcasts() {
  const [shows, featured, episodes] = await Promise.all([
    getPodcastShows(),
    getFeaturedPodcasts(),
    getLatestPodcastEpisodes(),
  ]);

  return (
    <div className="bg-[#141414]">
      <PodcastsHero shows={shows} featured={featured} />
      <LatestPodcastEpisodes episodes={episodes} />
      <CTASection />
    </div>
  );
}
