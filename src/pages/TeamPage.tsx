import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Linkedin, Sparkles } from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { AnimatedCard, ScrollReveal } from '../components/common/MotionComponents';
import { TeamMemberItem } from '../types/cms';

export const TeamPage: React.FC = () => {
  const { team } = useCms();
  const [selectedDept, setSelectedDept] = useState('All');
  const [activeModalMember, setActiveModalMember] = useState<TeamMemberItem | null>(null);

  const departments = ['All', 'Creative & Brand', 'Engineering', 'Growth & Strategy', 'Data & Optimization'];

  const filteredTeam = team.filter((m) => {
    if (!m.published) return false;
    if (selectedDept !== 'All' && !m.department.toLowerCase().includes(selectedDept.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      <SeoHead
        title="Leadership & Practice Leads"
        description="Meet the creative directors, motion engineers, and conversion scientists driving KINETIX client partnerships."
      />

      <Breadcrumbs items={[{ label: 'Team' }]} />

      {/* Header */}
      <ScrollReveal className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
          Partners & Custodians
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Crafted by Experienced Practitioners
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
          We do not pitch senior leaders and hand over your project to junior interns. Every engagement is actively directed and coded by our founding partners.
        </p>

        {/* Department Filters */}
        <div className="pt-4 flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-lg w-fit">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedDept === dept
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTeam.map((member, idx) => (
          <AnimatedCard
            key={member.id}
            delay={(idx % 6) * 0.08}
            className="rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col group cursor-pointer"
            enableHover={false}
          >
            <div
              className="flex-1 flex flex-col"
              onClick={() => setActiveModalMember(member)}
            >
              <div className="aspect-[4/5] bg-neutral-950 overflow-hidden relative">
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 p-2 rounded-lg bg-neutral-950/80 backdrop-blur-md text-neutral-400 hover:text-white transition-colors border border-neutral-800">
                  <Linkedin className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                    {member.department}
                  </span>
                  <h2 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {member.name}
                  </h2>
                  <p className="text-xs text-neutral-400">{member.role}</p>
                </div>

                <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                  {member.bio}
                </p>

                <div className="pt-2 text-xs font-semibold text-neutral-300 group-hover:text-amber-400 inline-flex items-center gap-1">
                  <span>View Full Biography</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Member Bio Modal */}
      {activeModalMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6 relative">
            <button
              onClick={() => setActiveModalMember(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white text-sm p-1"
            >
              ✕
            </button>

            <div className="flex items-center gap-4">
              <img
                src={activeModalMember.photoUrl}
                alt={activeModalMember.name}
                className="w-16 h-16 rounded-full object-cover border border-neutral-700"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-xl font-bold text-white">{activeModalMember.name}</h3>
                <p className="text-xs text-amber-400">{activeModalMember.role}</p>
                <p className="text-[11px] text-neutral-500 font-mono">{activeModalMember.department}</p>
              </div>
            </div>

            <div className="text-xs text-neutral-300 leading-relaxed space-y-3 border-t border-neutral-800 pt-4">
              <p>{activeModalMember.bio}</p>
              <p className="text-neutral-400">
                Directly leads strategy workshops and reviews all code and design deliverables for client flagships.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-neutral-800">
              <a
                href={activeModalMember.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-neutral-400 hover:text-white inline-flex items-center gap-1.5"
              >
                <Linkedin className="w-4 h-4 text-amber-400" />
                <span>LinkedIn Profile</span>
              </a>
              <Link
                to="/book-demo"
                onClick={() => setActiveModalMember(null)}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs rounded-lg transition-colors"
              >
                Schedule Session with {activeModalMember.name.split(' ')[0]}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Careers Teaser */}
      <div className="p-8 sm:p-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-white">Interested in Joining the Atelier?</h3>
          <p className="text-xs text-neutral-400 max-w-xl">
            We are actively recruiting senior creative technologists, brand designers, and growth directors across our Zurich and San Francisco studios.
          </p>
        </div>
        <Link
          to="/careers"
          className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span>View Open Positions</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
