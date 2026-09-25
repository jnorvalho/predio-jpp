"use client";

import dynamic from "next/dynamic";

import {
  ArrowLeft,
  MapPin,
  Martini,
  Navigation,
  ShieldAlert,
  Utensils,
} from "lucide-react";

import Link from "next/link";
import { useState } from "react";

import type { RallyMapStop } from "@/components/RallyMap";

const RallyMap = dynamic(
  () => import("@/components/RallyMap"),
  {
    ssr: false,
    loading: () => (
      <div className="rally-map-loading">
        A carregar mapa...
      </div>
    ),
  }
);

type PintxoStop = RallyMapStop & {
  zone: string;
  rule: string;
  penalty: string;
  mapsUrl: string;
};

const pintxoStops: PintxoStop[] = [
  // =========================================================
  // PLAZA NUEVA
  // =========================================================

  {
    number: 1,
    name: "Gure Toki",
    zone: "PLAZA NUEVA",
    location: "Plaza Nueva, 12",
    rule: 'Não se pode dizer "JPP".',
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Gure+Toki+Plaza+Nueva+12+Bilbao",
    lat: 43.258999,
    lng: -2.9229,
  },

  {
    number: 2,
    name: "Sorgínzulo",
    zone: "PLAZA NUEVA",
    location: "Plaza Nueva, 10/12",
    rule: 'Não se pode dizer "Bilbao".',
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Sorginzulo+Plaza+Nueva+Bilbao",
    lat: 43.259,
    lng: -2.92325,
  },

  {
    number: 3,
    name: "Víctor Montes",
    zone: "PLAZA NUEVA",
    location: "Plaza Nueva, 8",
    rule:
      "Só se pode segurar no copo com dois dedos.",
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Victor+Montes+Plaza+Nueva+8+Bilbao",
    lat: 43.2588,
    lng: -2.92235,
  },

  {
    number: 4,
    name: "Café Bar Bilbao",
    zone: "PLAZA NUEVA",
    location: "Plaza Nueva, 6",
    rule: "Óculos de sol obrigatórios.",
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Cafe+Bar+Bilbao+Plaza+Nueva+6",
    lat: 43.25865,
    lng: -2.9221,
  },

  {
    number: 5,
    name: "Antxoa Taberna",
    zone: "PLAZA NUEVA",
    location: "Plaza Nueva, 1",
    rule: 'Não se pode dizer "não sei".',
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Antxoa+Taberna+Plaza+Nueva+Bilbao",
    lat: 43.2584,
    lng: -2.92305,
  },

  {
    number: 6,
    name: "Zaharra - Plaza Nueva",
    zone: "PLAZA NUEVA",
    location: "Plaza Nueva, 4",
    rule:
      "Só se pode apontar com o dedo mindinho.",
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Zaharra+Plaza+Nueva+4+Bilbao",
    lat: 43.25855,
    lng: -2.92255,
  },

  // =========================================================
  // SANTA MARÍA / JARDINES
  // =========================================================

  {
    number: 7,
    name: "Irrintzi",
    zone: "SANTA MARÍA / JARDINES",
    location: "Santa María, 8",
    rule: 'É proibido dizer "sim".',
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Irrintzi+Santa+Maria+8+Bilbao",
    lat: 43.25822,
    lng: -2.92608,
  },

  {
    number: 8,
    name: "Bar Santamaría",
    zone: "SANTA MARÍA / JARDINES",
    location: "Santa María, Bilbao",
    rule: "Só se pode falar em voz baixa.",
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Bar+Santamaria+Bilbao",
    lat: 43.25805,
    lng: -2.92585,
  },

  {
    number: 9,
    name: "GATZ BERRIA SOCIEDAD LIMITADA",
    zone: "SANTA MARÍA / JARDINES",
    location: "Santa María, Bilbao",
    rule:
      "Não se pode pousar a bebida na mesa.",
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=GATZ+BERRIA+Bilbao",
    lat: 43.2579,
    lng: -2.92565,
  },

  {
    number: 10,
    name: "BERTON",
    zone: "SANTA MARÍA / JARDINES",
    location: "Casco Viejo, Bilbao",
    rule:
      "Só se pode usar a mão esquerda para pegar no pintxo.",
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Berton+Bilbao+Casco+Viejo",
    lat: 43.25815,
    lng: -2.92495,
  },

  {
    number: 11,
    name: "Sasibil",
    zone: "SANTA MARÍA / JARDINES",
    location: "Casco Viejo, Bilbao",
    rule:
      "Ninguém pode ir à casa de banho.",
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Sasibil+Bilbao",
    lat: 43.25822,
    lng: -2.92494,
  },

  {
    number: 12,
    name: "con B de bilbao",
    zone: "SANTA MARÍA / JARDINES",
    location: "Santa María, 9",
    rule: "Telemóveis proibidos.",
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Con+B+de+Bilbao+Santa+Maria+9",
    lat: 43.258,
    lng: -2.92635,
  },

  // =========================================================
  // SETE RUAS / SOMERA
  // =========================================================

  {
    number: 13,
    name: "Isipil Bar",
    zone: "SETE RUAS / SOMERA",
    location: "Somera, Bilbao",
    rule:
      "Sempre que alguém chegar, tem de cumprimentar toda a equipa.",
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Isipil+Bar+Bilbao",
    lat: 43.25765,
    lng: -2.9243,
  },

  {
    number: 14,
    name: "Xukela",
    zone: "SETE RUAS / SOMERA",
    location: "Somera, Bilbao",
    rule: 'Não se pode dizer "eu".',
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Xukela+Bilbao",
    lat: 43.2575,
    lng: -2.9239,
  },

  {
    number: 15,
    name: "Taberna Basaras",
    zone: "SETE RUAS / SOMERA",
    location: "Pilota Kalea",
    rule: "Ninguém pode estar sentado.",
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Taberna+Basaras+Pilota+Kalea+Bilbao",
    lat: 43.25714,
    lng: -2.92568,
  },

  {
    number: 16,
    name: "Ander Etxea",
    zone: "SETE RUAS / SOMERA",
    location: "Casco Viejo, Bilbao",
    rule:
      "Para pedir qualquer coisa, é obrigatório levantar dois dedos.",
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Ander+Etxea+Bilbao",
    lat: 43.2573,
    lng: -2.9235,
  },

  {
    number: 17,
    name: "Bodega Joserra",
    zone: "SETE RUAS / SOMERA",
    location: "Casco Viejo, Bilbao",
    rule:
      'Não se pode dizer "saúde", "cheers", "salud" ou "prost".',
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Bodega+Joserra+Bilbao",
    lat: 43.25693,
    lng: -2.92326,
  },

  // =========================================================
  // BILBAO LA VIEJA / MARZANA
  // =========================================================

  {
    number: 18,
    name: "Txondorra Berria Taberna",
    zone: "BILBAO LA VIEJA / MARZANA",
    location: "Bilbo Zaharra Kalea, 3",
    rule:
      "Só se pode gesticular com a mão direita.",
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Txondorra+Berria+Bilbo+Zaharra+3+Bilbao",
    lat: 43.25485,
    lng: -2.92385,
  },

  {
    number: 19,
    name: "Martzana Kalea",
    zone: "BILBAO LA VIEJA / MARZANA",
    location: "Martzana Kalea",
    rule: "Não são permitidas fotografias.",
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Martzana+Kalea+Bilbao",
    lat: 43.2543,
    lng: -2.9261,
  },

  {
    number: 20,
    name: "Bar Fermín",
    zone: "BILBAO LA VIEJA / MARZANA",
    location: "Iturribide, 4",
    rule:
      "Quem estiver de boné/gorro não pode tocar na cabeça.",
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Bar+Fermin+Iturribide+4+Bilbao",
    lat: 43.2587,
    lng: -2.9199,
  },

  // =========================================================
  // ENSANCHE / ABANDO
  // =========================================================

  {
    number: 21,
    name: "El Globo",
    zone: "ENSANCHE / ABANDO",
    location: "Calle Diputación, 8",
    rule:
      'A partir daqui, não se pode dizer "shot".',
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=El+Globo+Calle+Diputacion+8+Bilbao",
    lat: 43.2619,
    lng: -2.9294,
  },

  {
    number: 22,
    name: "La Viña del Ensanche",
    zone: "ENSANCHE / ABANDO",
    location: "Diputación / Ensanche",
    rule:
      "Só se pode beber com a mão esquerda.",
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=La+Vina+del+Ensanche+Bilbao",
    lat: 43.26164,
    lng: -2.93274,
  },

  {
    number: 23,
    name: "La Olla",
    zone: "ENSANCHE / ABANDO",
    location: "Bilbao",
    rule: 'É proibido dizer "não".',
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=La+Olla+Bilbao",
    lat: 43.262,
    lng: -2.932,
  },

  {
    number: 24,
    name: "El Pintxito",
    zone: "ENSANCHE / ABANDO",
    location: "Ensanche, Bilbao",
    rule:
      "Não se pode falar enquanto se está a comer o pintxo.",
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=El+Pintxito+Bilbao",
    lat: 43.2617,
    lng: -2.9308,
  },

  {
    number: 25,
    name: "Mugi Taberna",
    zone: "ENSANCHE / ABANDO",
    location: "Ensanche, Bilbao",
    rule:
      "Sempre que alguém disser o nome do noivo, todos têm de olhar para ele.",
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Mugi+Taberna+Bilbao",
    lat: 43.2615,
    lng: -2.9315,
  },

  {
    number: 26,
    name: "Bar Plata & Brochettes",
    zone: "ENSANCHE / ABANDO",
    location: "Ensanche, Bilbao",
    rule:
      "Sempre que alguém levantar o copo, todos têm de levantar o seu.",
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Bar+Plata+Brochettes+Bilbao",
    lat: 43.2623,
    lng: -2.9303,
  },

  {
    number: 27,
    name: "Gaztandegi",
    zone: "ENSANCHE / ABANDO",
    location: "Ensanche, Bilbao",
    rule: 'Não se pode dizer "queijo".',
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Gaztandegi+Bilbao",
    lat: 43.262,
    lng: -2.9297,
  },

  {
    number: 28,
    name: "Café Iruña",
    zone: "ENSANCHE / ABANDO",
    location: "Colón de Larreátegui, Bilbao",
    rule:
      'Só se pode responder às perguntas com "sim" ou "não".',
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Cafe+Iruna+Bilbao",
    lat: 43.26246,
    lng: -2.92809,
  },

  {
    number: 29,
    name: "Café Sirimiri",
    zone: "ENSANCHE / ABANDO",
    location: "Ensanche, Bilbao",
    rule:
      "Sempre que alguém beber, tem de contar em voz alta até 3 antes de pousar o copo.",
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Cafe+Sirimiri+Bilbao",
    lat: 43.2627,
    lng: -2.9305,
  },

  {
    number: 30,
    name: "Ledesma Taberna",
    zone: "ENSANCHE / ABANDO",
    location: "Calle Ledesma, Bilbao",
    rule:
      "Não se pode dizer o nome do noivo.",
    penalty: "1 shot",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Ledesma+Taberna+Bilbao",
    lat: 43.2632,
    lng: -2.9297,
  },
];

const zones = [
  {
    name: "PLAZA NUEVA",
    range: "1–6",
    stops: pintxoStops.filter(
      (stop) => stop.number >= 1 && stop.number <= 6
    ),
  },
  {
    name: "SANTA MARÍA / JARDINES",
    range: "7–12",
    stops: pintxoStops.filter(
      (stop) => stop.number >= 7 && stop.number <= 12
    ),
  },
  {
    name: "SETE RUAS / SOMERA",
    range: "13–17",
    stops: pintxoStops.filter(
      (stop) => stop.number >= 13 && stop.number <= 17
    ),
  },
  {
    name: "BILBAO LA VIEJA / MARZANA",
    range: "18–20",
    stops: pintxoStops.filter(
      (stop) => stop.number >= 18 && stop.number <= 20
    ),
  },
  {
    name: "ENSANCHE / ABANDO",
    range: "21–30",
    stops: pintxoStops.filter(
      (stop) => stop.number >= 21 && stop.number <= 30
    ),
  },
];

export default function RallyPintxosPage() {
  const [selectedStop, setSelectedStop] =
    useState<PintxoStop | null>(null);

  return (
    <main className="rally-page">
      {/* HEADER */}

      <header className="rally-header">
        <Link href="/" className="back-button">
          <ArrowLeft size={18} strokeWidth={1.8} />
          <span>PRÉDIO</span>
        </Link>

        <div className="rally-header-title">
          <span>PISO 1</span>
          <strong>RALLY PINTXOS</strong>
        </div>
      </header>

      {/* HERO */}

      <section className="rally-hero">
        <div className="rally-hero-icon">
          <Utensils size={34} strokeWidth={1.8} />
        </div>

        <span className="rally-kicker">
          30 CHECKPOINTS · 5 ZONAS
        </span>

        <h1>RALLY PINTXOS</h1>

        <p>
          30 tabernas de pintxos.
          <br />
          30 missões.
          <br />
          Um rally para cumprir ao longo
          de todo o fim de semana.
        </p>
      </section>

      {/* REGRAS */}

      <section className="rally-rules">
        <div className="rally-rule">
          <ShieldAlert
            size={21}
            strokeWidth={1.8}
          />

          <div>
            <span>COMO FUNCIONA</span>

            <p>
              Ao longo do fim de semana vais
              encontrar 30 checkpoints espalhados
              por diferentes zonas de Bilbao.
              Em cada taberna de pintxos existe
              uma missão diferente.
            </p>
          </div>
        </div>

        <div className="rally-rule">
          <Martini
            size={21}
            strokeWidth={1.8}
          />

          <div>
            <span>PENALIZAÇÃO</span>

            <p>
              Falhaste a missão?
              <br />
              1 shot.
            </p>
          </div>
        </div>
      </section>

      {/* MAPA */}

      <section className="rally-map-section">
        <div className="section-heading">
          <span>LOCALIZAÇÃO</span>
          <h2>Mapa do Rally</h2>
        </div>

        <div className="rally-map-card">
          <RallyMap stops={pintxoStops} />
        </div>

        <p className="map-hint">
          Toca num marcador para veres o checkpoint.
        </p>
      </section>

      {/* ZONAS */}

      <section className="rally-zones">
        <div className="section-heading">
          <span>ZONAS</span>
          <h2>Tabernas de pintxos</h2>
        </div>

        <div className="zones-list">
          {zones.map((zone) => (
            <section
              className="zone-section"
              key={zone.name}
            >
              <div className="zone-heading">
                <strong>{zone.name}</strong>
              </div>

              <div className="zone-stops">
                {zone.stops.map((stop) => (
                  <button
                    key={stop.number}
                    className="stop-card"
                    onClick={() =>
                      setSelectedStop(stop)
                    }
                  >
                    <div className="stop-number">
                      {stop.number}
                    </div>

                    <div className="stop-content">
                      <strong>
                        {stop.name}
                      </strong>

                      <div className="stop-location">
                        <MapPin
                          size={14}
                          strokeWidth={1.8}
                        />

                        {stop.location}
                      </div>
                    </div>

                    <div className="stop-arrow">
                      →
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      {/* AVISO */}

      <section className="rally-warning">
        <strong>
          ⚠️ AVISO DA ADMINISTRAÇÃO
        </strong>

        <p>
          Este Rally acontece ao longo de
          todo o fim de semana.
          Não é necessário completar as
          30 paragens de seguida.
          <br />
          <br />
          Cada checkpoint tem a sua própria
          missão.
          Falhaste a missão? 1 shot.
          <br />
          <br />
          A administração não garante que
          todos cheguem ao fim.
        </p>
      </section>

      {/* FOOTER */}

      <footer className="rally-footer">
        <Link
          href="/"
          className="rally-home-link"
        >
          <ArrowLeft
            size={18}
            strokeWidth={1.8}
          />
          VOLTAR AO PRÉDIO
        </Link>
      </footer>

      {/* =====================================================
          MODAL
          ===================================================== */}

      {selectedStop && (
        <div
          className="modal-backdrop"
          onClick={() =>
            setSelectedStop(null)
          }
        >
          <div
            className="modal rally-stop-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="modal-close"
              onClick={() =>
                setSelectedStop(null)
              }
              aria-label="Fechar"
            >
              ×
            </button>

            <div className="stop-modal-number">
              {selectedStop.number}
            </div>

            <span className="modal-kicker">
              {selectedStop.zone}
            </span>

            <h2>
              {selectedStop.name}
            </h2>

            <div className="stop-detail">
              <div className="detail-icon">
                <MapPin
                  size={20}
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <span>LOCALIZAÇÃO</span>

                <strong>
                  {selectedStop.location}
                </strong>
              </div>
            </div>

            <div className="stop-detail rule-detail">
              <div className="detail-icon">
                <Utensils
                  size={20}
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <span>MISSÃO</span>

                <strong>
                  {selectedStop.rule}
                </strong>
              </div>
            </div>

            <div className="penalty-detail">
              <span>SE FALHARES</span>

              <strong>
                {selectedStop.penalty}
              </strong>
            </div>

            <a
              href={selectedStop.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="maps-button"
            >
              <Navigation
                size={18}
                strokeWidth={1.8}
              />

              ABRIR NO MAPA
            </a>

            <button
              className="modal-button"
              onClick={() =>
                setSelectedStop(null)
              }
            >
              FECHAR
            </button>
          </div>
        </div>
      )}
    </main>
  );
}