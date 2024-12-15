import ContactInformation from "../components/About/ContactInformation";
import HistoryMilestones from "../components/About/HistoryMilestones";
import MissionStatement from "../components/About/MissionStatement";
import TeamSection from "../components/About/TeamSection";
import WhyChooseUs from "../components/Home/WhyChooseUs";

const Aboutpage = () => {
  return (
    <>
      <MissionStatement />
      <TeamSection />
      <HistoryMilestones />
      <WhyChooseUs />
      <ContactInformation />
    </>
  );
};

export default Aboutpage;
