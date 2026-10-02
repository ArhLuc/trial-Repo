import { useState } from "react";
import { motion } from "framer-motion";
import {
  Train,
  CloudRain,
  Calendar,
  MapPin,
  Clock,
  AlertTriangle,
  Zap,
  Activity,
  Cpu,
} from "lucide-react";

const initialForm = {
  train_no: 12301,
  weather: "Rain",
  day_of_week: "Friday",
  distance_from_source: 1200,
  previous_station_delay: 18,
  track_congestion: "High",
  station_congestion: "Medium",
};

function getDelayStatus(delay) {
  if (delay <= 5) return { label: "On time", className: "status-on-time" };
  if (delay <= 15) return { label: "Minor delay", className: "status-minor" };
  if (delay <= 30) return { label: "Moderate delay", className: "status-moderate" };
  return { label: "Major delay", className: "status-major" };
}

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const update = (e) => {
    const { name, value } = e.target;
    const numberFields = ["train_no", "distance_from_source", "previous_station_delay"];

    setForm({
      ...form,
      [name]: numberFields.includes(name) ? Number(value) : value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Backend error. Start Django server first.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const status = result ? getDelayStatus(result.predicted_delay) : null;

  return (
    <main className="site-shell">
      <div className="page-container">
        <nav className="site-nav" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="RailMind home">
            <span className="brand-mark"><Train size={19} strokeWidth={2.2} /></span>
            <span className="brand-name">railmind</span>
          </a>

          <div className="nav-links">
            <a href="#how-it-works">How it works</a>
            <a className="nav-cta" href="#predict">Try prediction <span aria-hidden="true">↗</span></a>
          </div>
        </nav>

        <section className="hero-section" id="top">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="hero-copy"
          >
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              A clearer view of what’s ahead
            </div>

            <h2 className="hero-title">
              Every journey,
              <span>right on track.</span>
            </h2>

            <p className="hero-description">
              A little more certainty for the miles ahead. Understand possible
              train delays with intelligent predictions built around real
              railway conditions.
            </p>

            <div className="route-card" id="how-it-works">
              <div className="route-heading">
                <span>THE JOURNEY, IN CONTEXT</span>
                <span className="route-live"><span /> MODEL READY</span>
              </div>
              <div className="route-visual" aria-hidden="true">
                <div className="route-stop"><span className="station-dot" /><span>Origin</span></div>
                <div className="route-track"><span className="route-train"><Train size={18} /></span></div>
                <div className="route-stop route-stop-end"><span className="station-dot" /><span>Destination</span></div>
              </div>
              <div className="route-caption">
                <span>Weather</span><i /> <span>Track conditions</span><i /> <span>Station activity</span>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            id="predict"
            className="prediction-card"
          >
            <div className="form-heading">
              <div className="form-icon"><Activity size={20} /></div>
              <div className="form-heading-copy">
                <p className="form-kicker">YOUR NEXT JOURNEY</p>
                <h3>Let’s check the line.</h3>
                <p>Share a few trip details to get started.</p>
              </div>
            </div>

            <div className="form-fields">
              <Input icon={<Train size={17} />} label="Train Number" name="train_no" type="number" value={form.train_no} onChange={update} />
              <Select icon={<CloudRain size={17} />} label="Weather" name="weather" value={form.weather} onChange={update} options={["Clear", "Cloudy", "Rain", "Fog"]} />
              <Select icon={<Calendar size={17} />} label="Day of Week" name="day_of_week" value={form.day_of_week} onChange={update} options={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]} />
              <Input icon={<MapPin size={17} />} label="Distance From Source" name="distance_from_source" type="number" value={form.distance_from_source} onChange={update} />
              <Input icon={<Clock size={17} />} label="Previous Delay" name="previous_station_delay" type="number" value={form.previous_station_delay} onChange={update} />
              <Select icon={<AlertTriangle size={17} />} label="Track Congestion" name="track_congestion" value={form.track_congestion} onChange={update} options={["Low", "Medium", "High"]} />
              <Select icon={<Cpu size={17} />} label="Station Congestion" name="station_congestion" value={form.station_congestion} onChange={update} options={["Low", "Medium", "High"]} />
            </div>

            <button
              disabled={loading}
              className="predict-button"
            >
              {loading ? "Checking the line…" : <>See my prediction <span aria-hidden="true">→</span></>}
            </button>
            <p className="form-footnote"><Zap size={13} /> Thoughtful predictions, powered by railway data.</p>
          </motion.form>
        </section>

        {result && (
          <motion.section
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            className="result-card"
            aria-live="polite"
          >
            <div className="result-grid">
              <div className="result-delay">
                <p className="result-label">PREDICTED DELAY</p>
                <h3>
                  {result.predicted_delay}
                  <span> min</span>
                </h3>
              </div>

              <div className="result-status">
                <p className="result-label">JOURNEY STATUS</p>
                <p className={`status-value ${status.className}`}>
                  {status.label}
                </p>
              </div>

              <div className="result-reasons">
                <p className="result-label">WHAT’S INFLUENCING IT</p>
                <div>
                  {result.reasons?.map((reason) => (
                    <div key={reason} className="reason-item">
                      <AlertTriangle size={16} />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        <footer className="site-footer">
          <span><Train size={15} /> Better journeys, one prediction at a time.</span>
          <span>RAILMIND <i /> BUILT FOR THE RAILWAY</span>
        </footer>
      </div>
    </main>
  );
}

function Input({ label, icon, ...props }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>

      <div className="field-control">
        <span className="field-icon">{icon}</span>

        <input
          {...props}
          className="field-input"
        />
      </div>
    </label>
  );
}

function Select({ label, icon, options, ...props }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>

      <div className="field-control">
        <span className="field-icon">{icon}</span>

        <select
          {...props}
          className="field-select"
        >
          {options.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
}