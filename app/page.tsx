import Link from 'next/link'
import Media from './components/media'

export default function Page() {
  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-tighter">
        Dylan Steck
      </h1>
      <p className="mb-4">
        Currently building products at <Link className="underline" href="https://neynar.com" target="_blank">Neynar</Link> and hacking at <Link className="underline" href="https://farhack.xyz" target="_blank">FarHack</Link>.
        Full-stack engineer focused on building software that gives people more agency. 
      </p>
      <div className="my-8">
        <Media />
      </div>
    </section>
  )
}
