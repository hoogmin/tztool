import TimeZoneConverter from './components/TimeZoneConverter'

export default function Home() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center text-center min-vh-100">
        <main className="container container-max-540">
          <h1
            id="mainTZToolTitle"
            className="fw-bolder"
            aria-label="TZTool Time Zone Converter Title">TZTool Time Zone Converter</h1>
          <TimeZoneConverter />
        </main>
      </div>
      <footer className='text-center fs-6 my-2'>
        <a
        className='text-decoration-underline'
        href="https://github.com/hoogmin/tztool"
        target="_blank"
        rel="noopener noreferrer">Source</a> &#x2022;
        BSD-3-Clause
      </footer>
    </>
  )
}
