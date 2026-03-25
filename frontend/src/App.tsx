import { useEffect, useState } from "react";
import axios from "axios";

// Tipo do item vindo da API Django
type Appointment = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  is_done: boolean;
  created_at: string;
  updated_at: string;
};

// URL base da API vinda do .env do Vite
const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  // Lista de agendamentos carregados do backend
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Estados do formulário
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Estados de UX
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Busca a lista inicial ao abrir a página
  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get<Appointment[]>(`${API_URL}/appointments/`);
      setAppointments(response.data);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar os agendamentos.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      await axios.post(`${API_URL}/appointments/`, {
        title,
        description,
        date,
        time,
        is_done: false,
      });

      // Limpa o formulário após salvar
      setTitle("");
      setDescription("");
      setDate("");
      setTime("");

      // Recarrega a lista
      await fetchAppointments();
    } catch (err) {
      console.error(err);
      setError("Não foi possível salvar o agendamento.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Agenda Docker</h1>
          <p style={styles.subtitle}>
            Projeto de testes com React, Django, PostgreSQL e Docker.
          </p>
        </header>

        <section style={styles.grid}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Novo agendamento</h2>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.field}>
                <label style={styles.label}>Nome</label>
                <input
                  style={styles.input}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Reunião com cliente"
                  required
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Descrição</label>
                <textarea
                  style={styles.textarea}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detalhes do compromisso"
                  rows={4}
                />
              </div>

              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Data</label>
                  <input
                    style={styles.input}
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Hora</label>
                  <input
                    style={styles.input}
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" style={styles.button} disabled={saving}>
                {saving ? "Salvando..." : "Salvar agendamento"}
              </button>
            </form>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Meus agendamentos</h2>

            {error ? <div style={styles.errorBox}>{error}</div> : null}

            {loading ? <p>Carregando...</p> : null}

            {!loading && appointments.length === 0 ? (
              <p>Nenhum agendamento cadastrado.</p>
            ) : null}

            <div style={styles.list}>
              {appointments.map((item) => (
                <article key={item.id} style={styles.item}>
                  <div style={styles.itemHeader}>
                    <strong>{item.title}</strong>
                    <span>{item.is_done ? "Concluído" : "Pendente"}</span>
                  </div>

                  <p style={styles.itemDescription}>
                    {item.description || "Sem descrição"}
                  </p>

                  <div style={styles.meta}>
                    <span>Data: {item.date}</span>
                    <span>Hora: {item.time}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    padding: "32px 16px",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "24px",
  },
  title: {
    margin: 0,
    fontSize: "32px",
  },
  subtitle: {
    marginTop: "8px",
    color: "#555",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: "16px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flex: 1,
  },
  label: {
    fontWeight: 600,
  },
  input: {
    height: "40px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "0 12px",
  },
  textarea: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "12px",
    resize: "vertical",
  },
  row: {
    display: "flex",
    gap: "12px",
  },
  button: {
    height: "42px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 700,
  },
  errorBox: {
    background: "#ffe8e8",
    color: "#9b1c1c",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "12px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  item: {
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "14px",
  },
  itemHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "8px",
  },
  itemDescription: {
    margin: "0 0 10px 0",
    color: "#444",
  },
  meta: {
    display: "flex",
    gap: "14px",
    fontSize: "14px",
    color: "#666",
  },
};