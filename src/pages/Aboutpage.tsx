import ContactInformation from "../components/About/ContactInformation";
import HistoryMilestones from "../components/About/HistoryMilestones";
import MissionStatement from "../components/About/MissionStatement";
import TeamSection from "../components/About/TeamSection";

const Aboutpage = () => {
  return (
    <>
      <MissionStatement />
      <TeamSection />
      <HistoryMilestones />
      <ContactInformation />
    </>
  );
};

export default Aboutpage;
