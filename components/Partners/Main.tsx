import PageHeader from "@/components/Common/PageHeader";
import PartnerForm from "./PartnersForm";

export default function Main() {
  return (
    <>
    <div className="pt-20">
      <PageHeader
        title="Let's create something meaningful."
        subtitle="Tell us a little about your organisation and how you'd like to partner with UNFILTERED. We read every enquiry personally"
      />
      </div>
      <PartnerForm />
    </>
  );
} 