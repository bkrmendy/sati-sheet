import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <div className="m-4 grid max-w-[600px] grid-cols-4 border-2 border-slate-50 font-mono">
          <div className="col-span-4 flex justify-center border border-slate-50 p-2 text-2xl font-bold uppercase">
            Copper site
          </div>
          <div className="col-span-2 flex justify-center border border-slate-50 p-1 pt-3 text-xl font-semibold uppercase">
            Needs
          </div>
          <div className="col-span-2 flex justify-center border border-slate-50 p-1 pt-3 text-xl font-bold uppercase">
            Makes
          </div>
          <div className="col-span-2 row-span-2 border border-slate-50 p-2"></div>
          <div className="flex justify-end border border-slate-50 p-2">
            Copper sheet
          </div>
          <div className="border border-slate-50 p-2">300/min</div>
          <div className="flex justify-end border border-slate-50 p-2">
            Cable
          </div>
          <div className="border border-slate-50 p-2">400/min</div>

          <div className="col-span-4 flex justify-center border border-slate-50 p-2 pt-3 text-xl font-bold uppercase">
            Machines
          </div>
          <div className="col-span-2 flex justify-end border border-slate-50 p-2">
            Copper ore
          </div>
          <div className="col-span-2 border border-slate-50 p-2">x 1</div>
          <div className="col-span-2 flex justify-end border border-slate-50 p-2">
            Copper ingot
          </div>
          <div className="col-span-2 border border-slate-50 p-2">x 7</div>
          <div className="col-span-2 flex justify-end border border-slate-50 p-2">
            Wire
          </div>
          <div className="col-span-2 border border-slate-50 p-2">x 10</div>
          <div className="col-span-2 flex justify-end border border-slate-50 p-2">
            Copper sheet
          </div>
          <div className="col-span-2 border border-slate-50 p-2">x 4</div>
        </div>
      </div>
    </div>
  );
}
