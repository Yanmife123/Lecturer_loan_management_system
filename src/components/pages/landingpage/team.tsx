import Image from "next/image";

const managementTeam = [
  {
    id: 1,
    name: "Prof. Adeyemi Johnson",
    role: "Chairman",
    image: "/landingpage/staff.jpg",
    description: "Oversees cooperative operations and strategic direction",
  },
  {
    id: 2,
    name: "Dr. Folake Adesanya",
    role: "Secretary",
    image: "/landingpage/staff.jpg",
    description: "Manages documentation and member communications",
  },
  {
    id: 3,
    name: "Mr. Oluwaseun Bakare",
    role: "Treasurer",
    image: "/landingpage/staff.jpg",
    description: "Financial oversight and fund management",
  },
  {
    id: 4,
    name: "Mrs. Grace Okonkwo",
    role: "Welfare Officer",
    image: "/landingpage/staff.jpg",
    description: "Member welfare and support services",
  },
];

export function Teams() {
  return (
    <div className="font-sans py-18 bg-white px-4 md:px-8" id="teams">
      <div className="flex justify-center">
        <div className="w-full max-w-7xl space-y-6">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-primaryT md:text-4xl text-2xl leading-10 font-medium text-center">
              Our Management Team
            </h2>
            <p className="text-[#64748B] leading-6 text-base max-w-166 text-center">
              Meet the dedicated professionals leading our cooperative to
              excellence.
            </p>
          </div>
          <div className="grid  md:grid-cols-2 grid-cols-1 md:gap-7 gap-6">
            {managementTeam.map((staff) => (
              <div
                key={staff.id}
                className="flex flex-col gap-4 items-center leading-7"
              >
                <div className="relative w-32 h-32 ">
                  {" "}
                  <Image
                    src={staff.image}
                    alt={staff.name}
                    fill
                    className="rounded-full object-cover object-center"
                  />
                </div>
                <h3 className="text-primaryT text-lg font-medium">
                  {staff.name}
                </h3>
                <p className="text-[#C89B2A] text-sm leading-5">
                  {" "}
                  {staff.role}
                </p>
                <p className="text-[#64748B] text-xs leading-4">
                  {staff.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
