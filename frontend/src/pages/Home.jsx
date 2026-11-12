import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import {
  Train,
  Gauge,
  CloudRain,
  Calendar,
  MapPin,
  AlertTriangle,
  Zap,
  Activity,
} from "lucide-react";
import { predictDelay } from "../services/api.js";

const initialForm = {
  train_name: "Lucknow Mail",
  boarding_station: "Lucknow",
  destination_station: "New Delhi",
  day_of_week: "Friday",
  weather: "Rain",
};

function getDelayStatus(delay) {
  if (delay <= 5) return { label: "On Time", color: "text-emerald-300" };
  if (delay <= 15) return { label: "Minor Delay", color: "text-yellow-300" };
  if (delay <= 30) return { label: "Moderate Delay", color: "text-orange-300" };
  return { label: "Major Delay", color: "text-red-300" };
}

export default function Home() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([
  {
    train_name: "Lucknow Mail",
    route: "Lucknow → New Delhi",
    weather: "Rain",
    delay: 49,
    status: "Major Delay",
  },
  {
    train_name: "Gomti Express",
    route: "Lucknow → Kanpur",
    weather: "Clear",
    delay: 8,
    status: "Minor Delay",
  },
  {
    train_name: "Shatabdi Express",
    route: "New Delhi → Lucknow",
    weather: "Fog",
    delay: 34,
    status: "Major Delay",
  },
  {
    train_name: "Intercity Express",
    route: "Lucknow → Prayagraj",
    weather: "Cloudy",
    delay: 16,
    status: "Moderate Delay",
  },
]);

  const update = (e) => {
  const { name, value } = e.target;

  setForm({
    ...form,
    [name]: value,
  });
};

  const submit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setResult(null);

  try {
    const data = await predictDelay(form);

    const enrichedResult = {
  ...data,
  passengerInfo: {
    train_name: form.train_name,
    boarding_station: form.boarding_station,
    destination_station: form.destination_station,
  },
};

setResult(enrichedResult);

const delayStatus = getDelayStatus(data.predicted_delay).label;

setHistory((prev) => [
  {
    train_name: form.train_name,
    route: `${form.boarding_station} → ${form.destination_station}`,
    weather: form.weather,
    delay: Number(data.predicted_delay),
    status: delayStatus,
  },
  ...prev,
]);
  } catch (err) {
    console.error(err);
    alert(`Prediction failed: ${err.message}`);
  } finally {
    setLoading(false);
  }
};

  const status = result ? getDelayStatus(result.predicted_delay) : null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-premium text-white">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute left-10 top-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 right-10 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-6">
        <nav className="glass mb-14 flex items-center justify-between rounded-3xl px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-400/15 p-3 glow">
              <Train className="text-cyan-300" />
            </div>

            <div>
              <h1 className="text-base font-black md:text-xl">
                AI Based Public Transport Delay Prediction
              </h1>
              <p className="text-xs text-slate-400">AI-powered delay insights</p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-5 py-2 text-sm text-cyan-200 md:flex">
            <Zap size={16} />
            AI Powered
          </div>
        </nav>

        <section className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-200">
              <Activity size={16} />
              Smarter Railway Operations
            </div>

            <h2 className="text-5xl font-black leading-tight md:text-7xl">
              AI Powered
              <span className="neon-text block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                Delay Prediction
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              Predict train delays using Machine Learning and railway operating
              conditions with real-time explainable insights.
            </p>

            <TrainScene />

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-4">
              <Stat title="ML Model" value="RF" />
              <Stat title="Inputs" value="7" />
              <Stat title="Backend" value="Django" />
            </div>
          </motion.div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="glass rounded-[2rem] p-6 md:p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black">Train Delay Checker</h3>
<p className="text-sm text-slate-400">
  Enter your journey details to predict possible delay
</p>
              </div>

              <Gauge className="text-amber-300" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
  <Input
    icon={<Train size={17} />}
    label="Train Name / Number"
    name="train_name"
    type="text"
    value={form.train_name}
    onChange={update}
  />

  <Input
    icon={<MapPin size={17} />}
    label="Boarding Station"
    name="boarding_station"
    type="text"
    value={form.boarding_station}
    onChange={update}
  />

  <Input
    icon={<MapPin size={17} />}
    label="Destination Station"
    name="destination_station"
    type="text"
    value={form.destination_station}
    onChange={update}
  />

  <Select
    icon={<Calendar size={17} />}
    label="Journey Day"
    name="day_of_week"
    value={form.day_of_week}
    onChange={update}
    options={[
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ]}
  />

  <Select
    icon={<CloudRain size={17} />}
    label="Weather"
    name="weather"
    value={form.weather}
    onChange={update}
    options={["Clear", "Cloudy", "Rain", "Fog"]}
  />
</div>

            <button
              disabled={loading}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-6 py-4 font-black text-white shadow-xl shadow-cyan-500/25 transition hover:scale-[1.015] disabled:opacity-60"
            >
              {loading ? "Analyzing Railway Data..." : "Predict Delay"}
            </button>
          </motion.form>
        </section>

        {result && (
          <motion.section
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass mt-10 rounded-[2rem] p-8"
          >
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex items-center gap-6 md:col-span-1">
                <div className="delay-gauge">
                  <div className="delay-gauge-inner">
                    <div className="text-center">
                      <p className="text-5xl font-black text-cyan-300">
                        {result.predicted_delay}
                      </p>
                      <p className="text-sm text-slate-400">minutes</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
                <p className="text-sm text-slate-400">
  {result.passengerInfo?.train_name} forecast
</p>

                <p className={`mt-2 text-3xl font-black ${status.color}`}>
                  {status.label}
                </p>

                <p className="mt-3 text-sm text-slate-400">
                  From {result.passengerInfo?.boarding_station} to{" "}
{result.passengerInfo?.destination_station}. Keep checking live railway updates before leaving.
                </p>
              </div>

              <div>
                <p className="mb-3 text-sm text-slate-400">Detected Reasons</p>

                <div className="space-y-3">
                  {result.reasons?.map((reason) => (
                    <div
                      key={reason}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
                    >
                      <AlertTriangle size={17} className="text-amber-300" />
                      <span className="text-sm">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}
        <AnalyticsDashboard history={history} />
      </div>
    </main>
  );
}
function AnalyticsDashboard({ history }) {
  const trainWise = useMemo(() => averageBy(history, "train_name"), [history]);
  const weatherWise = useMemo(() => averageBy(history, "weather"), [history]);
  const routeWise = useMemo(() => averageBy(history, "route"), [history]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="glass mt-10 rounded-[2rem] p-6 md:p-8"
    >
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-black">Delay Analytics Dashboard</h2>
          <p className="mt-1 text-sm text-slate-400">
            Train-wise, weather-wise and route-wise delay insights
          </p>
        </div>

        <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-5 py-2 text-sm font-semibold text-cyan-200">
          {history.length} Predictions Tracked
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <DashboardCard
          title="Train-wise Delay"
          subtitle="Average delay by train"
          data={trainWise}
        />

        <DashboardCard
          title="Weather-wise Delay"
          subtitle="Impact of weather conditions"
          data={weatherWise}
        />

        <DashboardCard
          title="Route-wise Delay"
          subtitle="Average delay by route"
          data={routeWise}
        />
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-black/25 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-black">Recent Predictions</h3>
          <p className="text-sm text-slate-400">Latest passenger checks</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="border-b border-white/10 text-slate-400">
              <tr>
                <th className="py-3">Train</th>
                <th className="py-3">Route</th>
                <th className="py-3">Weather</th>
                <th className="py-3">Delay</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {history.slice(0, 8).map((item, index) => (
                <tr key={index} className="border-b border-white/5">
                  <td className="py-4 font-semibold text-white">
                    {item.train_name}
                  </td>
                  <td className="py-4 text-slate-300">{item.route}</td>
                  <td className="py-4 text-slate-300">{item.weather}</td>
                  <td className="py-4 font-black text-cyan-300">
                    {item.delay} min
                  </td>
                  <td className="py-4">
                    <span className={getStatusBadge(item.status)}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.section>
  );
}
function DashboardCard({ title, subtitle, data }) {
  const maxDelay = Math.max(...data.map((item) => item.delay), 1);

  return (
    <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
      <div className="mb-5">
        <h3 className="text-xl font-black">{title}</h3>
        <p className="text-sm text-slate-400">{subtitle}</p>
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.name}>
            <div className="mb-2 flex justify-between gap-4 text-sm">
              <span className="max-w-[180px] truncate text-slate-300">
                {item.name}
              </span>
              <span className="font-bold text-cyan-300">
                {item.delay} min
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
                style={{ width: `${(item.delay / maxDelay) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function averageBy(items, key) {
  const grouped = {};

  items.forEach((item) => {
    const name = item[key];

    if (!grouped[name]) {
      grouped[name] = {
        total: 0,
        count: 0,
      };
    }

    grouped[name].total += Number(item.delay);
    grouped[name].count += 1;
  });

  return Object.entries(grouped)
    .map(([name, value]) => ({
      name,
      delay: Math.round(value.total / value.count),
    }))
    .sort((a, b) => b.delay - a.delay);
}

function getStatusBadge(status) {
  if (status === "On Time") {
    return "rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300";
  }

  if (status === "Minor Delay") {
    return "rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-bold text-yellow-300";
  }

  if (status === "Moderate Delay") {
    return "rounded-full bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-300";
  }

  return "rounded-full bg-red-400/10 px-3 py-1 text-xs font-bold text-red-300";
}
function TrainScene() {
  return (
    <div className="rail-scene">
      <div className="scan-line" />

      <div className="absolute left-6 top-5 z-10 flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-bold text-cyan-200">
        <Activity size={14} />
        LIVE RAILWAY INTELLIGENCE
      </div>

      <div className="train-visual">
        <div className="train-window" />
        <div className="train-window" />
        <div className="train-window" />
        <div className="train-window" />
        <div className="signal-dot" />
      </div>

      <div className="absolute bottom-4 left-8 right-8 flex justify-between text-xs text-slate-400">
        <span>Source Station</span>
        <span>AI Route Analysis</span>
        <span>Destination</span>
      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="glass rounded-2xl p-4">
      <p className="text-2xl font-black text-cyan-300">{value}</p>
      <p className="text-sm text-slate-400">{title}</p>
    </div>
  );
}

function Input({ label, icon, ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-slate-300">{label}</span>

      <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 focus-within:border-cyan-300">
        <span className="pointer-events-none text-cyan-300">{icon}</span>

        <input
          {...props}
          className="w-full min-w-0 bg-transparent text-white outline-none placeholder:text-slate-500"
        />
      </div>
    </label>
  );
}

function Select({ label, icon, options, ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-slate-300">{label}</span>

      <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 focus-within:border-cyan-300">
        <span className="pointer-events-none text-cyan-300">{icon}</span>

        <select
          {...props}
          className="w-full min-w-0 appearance-none bg-slate-950 text-white outline-none"
        >
          {options.map((item) => (
            <option key={item} value={item} className="bg-slate-950 text-white">
              {item}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
}

AnalyticsDashboard.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      train_name: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
      weather: PropTypes.string.isRequired,
      delay: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      delay: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

Stat.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};