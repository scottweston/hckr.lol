const location = "Ballarat Hackerspace, Ballarat";

function meetup(number, date, offset, description, ticketUrl = "") {
  const displayDate = new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));

  return {
    title: `Ballarat IndieWeb meetup #${number}`,
    date,
    displayDate,
    start: `${date}T18:30:00${offset}`,
    end: `${date}T20:30:00${offset}`,
    startTime: "6:30 pm",
    endTime: "8:30 pm",
    location,
    description,
    ticketUrl,
  };
}

// Fourth Wednesday of each month. Add a ticket URL when registration opens.
module.exports = [
  meetup(14, "2027-09-22", "+10:00", "A friendly evening for building and tending your own corner of the web. Bring a laptop, a question or just your curiosity; newcomers are welcome."),
  meetup(13, "2027-08-25", "+10:00", "Come work on a personal site, trade links and ask how the independent web fits together. Bring a laptop if you have one, or simply come along."),
  meetup(12, "2027-07-28", "+10:00", "Whether you are starting a homepage or improving one you already have, join us for a relaxed IndieWeb evening. Bring your laptop, ideas or questions."),
  meetup(11, "2027-06-23", "+10:00", "Spend an evening making a little more of the web your own. We share links, help with personal websites and welcome people at every level of experience."),
  meetup(10, "2027-05-26", "+10:00", "A casual meetup for people curious about personal websites and the open web. Bring a project to tinker with, a problem to untangle or just yourself."),
  meetup(9, "2027-04-28", "+10:00", "Bring your website, your first idea for one, or a question about domains and publishing. We will make things together and swap notes about the IndieWeb."),
  meetup(8, "2027-03-24", "+11:00", "Join neighbours who like owning their URLs and sharing what they make. Bring a laptop for hands-on time, or come to learn and trade ideas."),
  meetup(7, "2027-02-24", "+11:00", "An open table for personal sites, small web experiments and friendly help. You can bring something to build or arrive with nothing but curiosity."),
  meetup(6, "2027-01-27", "+11:00", "Start the year with a little space for your own web projects. Bring a laptop, a half-finished site or a question; we will share ideas and useful links."),
  meetup(5, "2026-12-23", "+11:00", "A relaxed IndieWeb gathering to tinker with personal websites and compare notes on the open web. Come with a laptop or just come to meet people."),
  meetup(4, "2026-11-25", "+11:00", "Have a site you want to improve, or want to make your first one? Bring your questions and join us for an evening of building, sharing and learning."),
  meetup(3, "2026-10-28", "+11:00", "Come make a home for your ideas on the web. We will talk personal sites, help each other get unstuck and swap links. Bring a laptop if you can."),
  meetup(2, "2026-09-23", "+10:00", "Our second gathering for making personal websites, swapping links and learning how the open web fits together. Bring a laptop or just yourself.", "https://ballarathackerspace.tidyhq.com/public/schedule/events/89198-indieweb-meetup"),
  meetup(1, "2026-08-26", "+10:00", "Our first gathering for making personal websites, swapping links and learning how the open web fits together. Bring a laptop or just yourself.", "https://thq.fyi/se/9ON8a9Q"),
];
