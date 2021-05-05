import Link from 'next/link'

export default function hello() {
  return (
    <>
      <h1>hello,world</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  )
}
