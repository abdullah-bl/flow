import Header from "~/components/header";

export default function ProjectTimelinePage() {
  return (
    <>
      <Header back>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex flex-col gap-0">
            <h1 className="text-xl font-semibold">Project Timeline</h1>
            <span className="text-sm text-gray-500">
              Add milestones to your project
            </span>
          </div>
        </div>
      </Header>
    </>
  );
}
