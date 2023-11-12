import TimeZoneConverter from './components/TimeZoneConverter'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className="d-flex justify-content-center align-items-center text-center min-vh-100">
      <main className="container">
        <h1 
        id="mainTZToolTitle" 
        className="fw-bolder fs-1" 
        aria-label="TZTool Time Zone Converter Title">TZTool Time Zone Converter</h1>
        <TimeZoneConverter/>
      </main>
    </div>
  )
}
