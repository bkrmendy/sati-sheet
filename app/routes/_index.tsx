import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col items-center gap-16">
        <div className="m-4 grid max-w-[500px] grid-cols-4 border-2 border-slate-950 font-mono">
          <div className="col-span-4 flex justify-center border border-slate-950 p-2 text-2xl font-bold uppercase">
            Copper site
          </div>
          <div className="col-span-2 flex justify-center border border-slate-950 p-1 pt-3 text-xl font-semibold uppercase">
            Needs
          </div>
          <div className="col-span-2 flex justify-center border border-slate-950 p-1 pt-3 text-xl font-bold uppercase">
            Makes
          </div>
          <div className="col-span-2 row-span-2 border border-slate-950 p-2"></div>
          <div className="flex justify-end border border-slate-950 p-2 font-semibold">
            Copper sheet
          </div>
          <div className="border border-slate-950 p-2 font-semibold">300/min</div>
          <div className="flex justify-end border border-slate-950 p-2 font-semibold">
            Cable
          </div>
          <div className="border border-slate-950 p-2 font-semibold">400/min</div>

          <div className="col-span-4 flex justify-center border border-slate-950 p-2 pt-3 text-xl font-bold uppercase">
            Machines
          </div>
          <div className="col-span-2 flex justify-end border border-slate-950 p-2 font-semibold">
            Copper ore
          </div>
          <div className="col-span-2 border border-slate-950 p-2 font-semibold">x 1</div>
          <div className="col-span-2 flex justify-end border border-slate-950 p-2 font-semibold">
            Copper ingot
          </div>
          <div className="col-span-2 border border-slate-950 p-2 font-semibold">x 7</div>
          <div className="col-span-2 flex justify-end border border-slate-950 p-2 font-semibold">
            Wire
          </div>
          <div className="col-span-2 border border-slate-950 p-2 font-semibold">x 10</div>
          <div className="col-span-2 flex justify-end border border-slate-950 p-2 font-semibold">
            Copper sheet
          </div>
          <div className="col-span-2 border border-slate-950 p-2 font-semibold">x 4</div>
        </div>
      </div>
    </div>
  )
}
