import { AnimatedTestimonials } from "../../components/ui/animated-testimonials";

export default function Members() {
  const testimonials = [
    {
      quote:
        "The meticulous attention to detail and cutting-edge features have revolutionized our workflow. This solution is precisely what we 'byte' for!",
      name: "Kevin Bueno",
      designation: "Founder and Frontend Developer of WorkInWeb",
      src: "/members/kevin.JPEG",
    },
    {
      quote: "Code is my canvas, and the web is my masterpiece.",
      name: "Daniel Caluff",
      designation: "Frontend Developer of WorkInWeb",
      src: "/members/caluff.jpeg",
    },
    {
      quote:
        "Cooperative efforts in software development yield solutions far greater than the sum of individual contributions.",
      name: "Daniel Rodriguez",
      designation: "Backend and Services Developer",
      src: "https://placehold.co/48",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <div className="bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
      <AnimatedTestimonials testimonials={testimonials} />;
    </div>
  );
}
