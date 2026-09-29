"use client";

import Image from "next/image";
import Link from "next/link";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
}

const SCHOLAR_TEAM: TeamMember[] = [
  {
    name: "Sophia Rose",
    role: "UX Teacher",
    image: "/images/team/member-01.jpg",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
  },
  {
    name: "Cindy Walker",
    role: "Graphic Teacher",
    image: "/images/team/member-02.jpg",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
  },
  {
    name: "David Hutson",
    role: "Full Stack Master",
    image: "/images/team/member-03.jpg",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
  },
  {
    name: "Stella Blair",
    role: "Digital Animator",
    image: "/images/team/member-04.jpg",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
  },
];

export default function ScholarTeamSection({
  showHeader = true,
  title = "With Scholar Teachers, Everything Is Easier",
  subtitle = "Our Expert Instructors",
}: {
  showHeader?: boolean;
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative w-full pt-20 pb-16 overflow-hidden" id="team">
      <div className="container-aec">
        {showHeader && (
          <div className="text-center max-w-2xl mx-auto mb-28">
            <span className="inline-block text-sm font-bold uppercase tracking-wider text-[#7a6ad8] bg-[#7a6ad8]/10 px-4 py-1.5 rounded-full mb-3">
              {subtitle}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1e1e1e]">
              {title}
            </h2>
            <div className="w-16 h-1 bg-[#7a6ad8] mx-auto mt-4 rounded-full" />
          </div>
        )}

        {/* 4 Team Member Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-28 pt-8">
          {SCHOLAR_TEAM.map((member) => (
            <div
              key={member.name}
              className="group relative"
            >
              {/* Card Container with rounded corners & scholar lilac background */}
              <div className="relative rounded-[25px] bg-[#f1f0fe] pt-[125px] pb-9 px-6 text-center transition-all duration-300 shadow-sm hover:shadow-xl">
                {/* Floating Circular Image that lifts on hover */}
                <div className="absolute -top-[95px] left-1/2 -translate-x-1/2 w-[190px] h-[190px] sm:w-[200px] sm:h-[200px] rounded-full overflow-hidden shadow-lg transition-transform duration-300 group-hover:-translate-y-2 border-4 border-white">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={220}
                    height={220}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Role / Category */}
                <span className="block text-[15px] font-medium text-[#7a6ad8] tracking-wide">
                  {member.role}
                </span>

                {/* Name */}
                <h4 className="mt-2 mb-4 text-[22px] font-bold text-[#1e1e1e] leading-snug">
                  {member.name}
                </h4>

                {/* Social Media Links */}
                <div className="flex items-center justify-center gap-2 mt-2">
                  <a
                    href={member.facebook || "#"}
                    aria-label={`${member.name} Facebook`}
                    className="w-10 h-10 rounded-full bg-white text-[#7a6ad8] flex items-center justify-center transition-all duration-300 hover:bg-[#7a6ad8] hover:text-white shadow-sm hover:scale-105"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href={member.twitter || "#"}
                    aria-label={`${member.name} Twitter`}
                    className="w-10 h-10 rounded-full bg-white text-[#7a6ad8] flex items-center justify-center transition-all duration-300 hover:bg-[#7a6ad8] hover:text-white shadow-sm hover:scale-105"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a
                    href={member.linkedin || "#"}
                    aria-label={`${member.name} LinkedIn`}
                    className="w-10 h-10 rounded-full bg-white text-[#7a6ad8] flex items-center justify-center transition-all duration-300 hover:bg-[#7a6ad8] hover:text-white shadow-sm hover:scale-105"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
