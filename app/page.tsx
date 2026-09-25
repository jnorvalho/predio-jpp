"use client";

import { useEffect, useState } from "react";
import {
  Beer,
  Building2,
  DoorOpen,
  ExternalLink,
  LockKeyhole,
  MapPin,
  Ship,
  Trophy,
  Utensils,
  X,
} from "lucide-react";

type Floor = {
  id: string;
  level: string;
  title: string;
  icon: typeof Building2;
  availableFrom: Date | null;
};

const JPP_LEAGUE_URL = "https://jpp-league.vercel.app";

const CRAFT_BEER_MAPS_URL =
  "https://maps.app.goo.gl/ry1JJ82PNvsPPvpq8?g_st=ic";

const ACCOMMODATION_MAPS_URL =
  "https://maps.app.goo.gl/QRqrPygicWCQuHFQ6";

const PARTY_BOAT_MAPS_URL =
  "https://maps.app.goo.gl/8eadHjAsqP6Bn6198";

const floors: Floor[] = [
  {
    id: "rooftop",
    level: "ROOFTOP",
    title: "Party Boat",
    icon: Ship,
    availableFrom: new Date("2026-10-03T15:00:00+02:00"),
  },
  {
    id: "floor3",
    level: "PISO 3",
    title: "Casco Viejo",
    icon: Building2,
    availableFrom: new Date("2026-10-02T23:00:00+02:00"),
  },
  {
    id: "floor2",
    level: "PISO 2",
    title: "The Craft Tabeerna",
    icon: Beer,
    availableFrom: new Date("2026-10-02T21:00:00+02:00"),
  },
  {
    id: "floor1",
    level: "PISO 1",
    title: "Rally Pintxos",
    icon: Utensils,
    availableFrom: new Date("2026-10-02T18:30:00+02:00"),
  },
  {
    id: "ground",
    level: "R/C",
    title: "Sala do Condomínio",
    icon: Building2,
    availableFrom: new Date("2026-10-02T17:30:00+02:00"),
  },
  {
    id: "basement",
    level: "CAVE",
    title: "Casino Ilegal",
    icon: Trophy,
    availableFrom: null,
  },
];

function isFloorAvailable(floor: Floor, now: Date) {
  if (!floor.availableFrom) {
    return true;
  }

  return now >= floor.availableFrom;
}

function formatAvailability(date: Date | null) {
  if (!date) {
    return "Sempre disponível";
  }

  return (
    new Intl.DateTimeFormat("pt-PT", {
      timeZone: "Europe/Madrid",
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date) + " (ES)"
  );
}

/*
 * =========================================================
 * PREVIEW
 * =========================================================
 *
 * Para testar uma data futura:
 *
 * const PREVIEW_DATE: Date | null =
 *   new Date("2026-10-04T18:00:00+02:00");
 *
 * Para voltar ao funcionamento normal:
 *
 * const PREVIEW_DATE: Date | null = null;
 */

const PREVIEW_DATE: Date | null =
  new Date("2026-10-04T18:00:00+02:00");

export default function Home() {
  const [now, setNow] = useState(
    () => PREVIEW_DATE ?? new Date()
  );

  const [maintenanceFloor, setMaintenanceFloor] =
    useState<Floor | null>(null);

  const [openFloor, setOpenFloor] =
    useState<Floor | null>(null);

  useEffect(() => {
    if (PREVIEW_DATE) {
      return;
    }

    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!maintenanceFloor && !openFloor) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMaintenanceFloor(null);
        setOpenFloor(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [maintenanceFloor, openFloor]);

  function handleFloorClick(floor: Floor) {
    const available = isFloorAvailable(floor, now);

    if (!available) {
      setMaintenanceFloor(floor);
      return;
    }

    setOpenFloor(floor);
  }

  const upperFloors = floors.filter(
    (floor) => floor.id !== "basement"
  );

  const basement = floors.find(
    (floor) => floor.id === "basement"
  );

  return (
    <main className="min-h-screen bg-[#07182f] text-white">
      <div className="mx-auto max-w-lg px-4 pb-12 pt-8">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <header className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#c9a227] bg-[#0d2340] text-[#c9a227]">
            <Building2
              size={30}
              strokeWidth={1.5}
            />
          </div>

          <p className="mb-2 text-xs font-bold tracking-[0.35em] text-[#c9a227]">
            DESPEDIDA JPP
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            PRÉDIO DO JPP
          </h1>
        </header>

        {/* ================================================= */}
        {/* INTRO */}
        {/* ================================================= */}

        <section className="mb-10 text-center">
          <h2 className="mb-4 text-lg font-semibold text-[#c9a227]">
            BEM-VINDO AO PRÉDIO DO JPP
          </h2>

          <p className="mx-auto max-w-sm text-sm leading-6 text-white/70">
            Depois das guerras e lutas na gestão do
            seu condomínio, chegou a altura de assumir
            um desafio maior.
          </p>

          <p className="my-4 text-base font-semibold">
            Um prédio. Vários andares. Uma despedida.
          </p>

          <p className="text-sm text-white/70">
            Entra, escolhe o andar e prepara-te para o
            que aí vem.
          </p>
        </section>

        {/* ================================================= */}
        {/* BUILDING */}
        {/* ================================================= */}

        <section className="building">

          <div className="roof">
            <div className="roof-sign">
              <span>PRÉDIO DO JPP</span>
            </div>
          </div>

          <div className="building-body">

            {upperFloors.map((floor) => {
              const Icon = floor.icon;

              const available =
                isFloorAvailable(floor, now);

              const isGround =
                floor.id === "ground";

              return (
                <button
                  key={floor.id}
                  type="button"
                  onClick={() =>
                    handleFloorClick(floor)
                  }
                  className={`building-floor ${
                    isGround
                      ? "ground-floor"
                      : ""
                  } ${
                    !available
                      ? "locked-floor"
                      : "available-floor"
                  }`}
                >
                  <div
                    className="floor-windows"
                    aria-hidden="true"
                  >
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="floor-content">

                    <div className="floor-icon">
                      {available ? (
                        <Icon
                          size={22}
                          strokeWidth={1.8}
                        />
                      ) : (
                        <LockKeyhole
                          size={21}
                          strokeWidth={1.8}
                        />
                      )}
                    </div>

                    <div className="floor-info">
                      <span className="floor-level">
                        {floor.level}
                      </span>

                      {available && (
                        <span className="floor-title">
                          {floor.title}
                        </span>
                      )}

                      <span
                        className={`floor-status ${
                          available
                            ? "floor-status-open"
                            : "floor-status-locked"
                        }`}
                      >
                        {available
                          ? "🔓 DISPONÍVEL"
                          : "🔒 EM MANUTENÇÃO"}
                      </span>

                      {!available && (
                        <span className="floor-availability">
                          Abre em{" "}
                          {formatAvailability(
                            floor.availableFrom
                          )}
                        </span>
                      )}
                    </div>

                    {available ? (
                      <DoorOpen
                        size={20}
                        strokeWidth={1.5}
                        className={`floor-door ${
                          isGround
                            ? "ground-floor-door"
                            : ""
                        }`}
                      />
                    ) : (
                      <LockKeyhole
                        size={20}
                        strokeWidth={1.5}
                        className={`floor-door ${
                          isGround
                            ? "ground-floor-door"
                            : ""
                        }`}
                      />
                    )}
                  </div>

                  {!isGround && (
                    <div
                      className="balcony"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}

            {/* ================================================= */}
            {/* ENTRADA */}
            {/* ================================================= */}

            <div className="street">
              <div className="entrance">
                <div className="entrance-door">
                  <DoorOpen
                    size={22}
                    strokeWidth={1.5}
                  />
                </div>

                <span>ENTRADA</span>
              </div>
            </div>

            {/* ================================================= */}
            {/* CAVE */}
            {/* ================================================= */}

            {basement && (() => {
              const available =
                isFloorAvailable(basement, now);

              const Icon = basement.icon;

              return (
                <button
                  key={basement.id}
                  type="button"
                  onClick={() =>
                    handleFloorClick(basement)
                  }
                  className={`building-floor basement-floor ${
                    !available
                      ? "locked-floor"
                      : "available-floor"
                  }`}
                >
                  <div
                    className="floor-windows"
                    aria-hidden="true"
                  >
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="floor-content">

                    <div className="floor-icon">
                      {available ? (
                        <Icon
                          size={22}
                          strokeWidth={1.8}
                        />
                      ) : (
                        <LockKeyhole
                          size={21}
                          strokeWidth={1.8}
                        />
                      )}
                    </div>

                    <div className="floor-info">
                      <span className="floor-level">
                        {basement.level}
                      </span>

                      {available && (
                        <span className="floor-title">
                          {basement.title}
                        </span>
                      )}

                      <span
                        className={`floor-status ${
                          available
                            ? "floor-status-open"
                            : "floor-status-locked"
                        }`}
                      >
                        {available
                          ? "🔓 DISPONÍVEL"
                          : "🔒 EM MANUTENÇÃO"}
                      </span>

                      {!available && (
                        <span className="floor-availability">
                          Abre em{" "}
                          {formatAvailability(
                            basement.availableFrom
                          )}
                        </span>
                      )}
                    </div>

                    {available ? (
                      <DoorOpen
                        size={20}
                        strokeWidth={1.5}
                        className="floor-door"
                      />
                    ) : (
                      <LockKeyhole
                        size={20}
                        strokeWidth={1.5}
                        className="floor-door"
                      />
                    )}
                  </div>
                </button>
              );
            })()}
          </div>
        </section>

        <footer className="mt-8 text-center text-xs text-white/30">
          Administração do Condomínio JPP · 2026
        </footer>
      </div>

      {/* ================================================= */}
      {/* MODAL — MANUTENÇÃO */}
      {/* ================================================= */}

      {maintenanceFloor && (
        <div
          className="maintenance-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="maintenance-title"
          onClick={() =>
            setMaintenanceFloor(null)
          }
        >
          <div
            className="maintenance-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              aria-label="Fechar"
              className="maintenance-close"
              onClick={() =>
                setMaintenanceFloor(null)
              }
            >
              <X size={20} />
            </button>

            <div className="maintenance-icon">
              <LockKeyhole
                size={30}
                strokeWidth={1.6}
              />
            </div>

            <p className="maintenance-level">
              {maintenanceFloor.level}
            </p>

            <h2 id="maintenance-title">
              O condomínio ainda está em manutenção
            </h2>

            <p>
              O administrador informa que este andar
              ainda não está disponível.
            </p>

            <p className="maintenance-hint">
              Volta mais tarde. Quando chegar a hora,
              a porta abre-se automaticamente.
            </p>

            <button
              type="button"
              className="maintenance-button"
              onClick={() =>
                setMaintenanceFloor(null)
              }
            >
              PERCEBIDO
            </button>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* MODAL — R/C / SALA DO CONDOMÍNIO */}
      {/* ================================================= */}

      {openFloor?.id === "ground" && (
        <div
          className="maintenance-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ground-title"
          onClick={() => setOpenFloor(null)}
        >
          <div
            className="floor-modal ground-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              aria-label="Fechar"
              className="maintenance-close"
              onClick={() => setOpenFloor(null)}
            >
              <X size={20} />
            </button>

            <div className="floor-modal-icon">
              <Building2
                size={30}
                strokeWidth={1.5}
              />
            </div>

            <p className="maintenance-level">
              R/C · SALA DO CONDOMÍNIO
            </p>

            <h2 id="ground-title">
              Bem-vindos à sala do condomínio
            </h2>

            <p className="floor-modal-intro">
              O administrador informa que o
              condomínio está oficialmente em
              funcionamento.
            </p>

            <section className="secret-destination">
              <div className="secret-lock">
                🔐
              </div>

              <div>
                <span className="secret-label">
                  DESTINO
                </span>

                <strong>
                  BILBAO
                </strong>

                <p>
                  O destino foi finalmente revelado.
                </p>
              </div>
            </section>

            <section className="ground-section">
              <h3>✈️ VIAGEM</h3>

              <div className="info-grid">
                <div className="info-card">
                  <span>IDA · LISBOA</span>
                  <strong>16:20 (PT)</strong>
                  <small>02/10/2026</small>
                </div>

                <div className="info-card">
                  <span>IDA · PORTO</span>
                  <strong>16:25 (PT)</strong>
                  <small>02/10/2026</small>
                </div>

                <div className="info-card">
                  <span>REGRESSO · LISBOA</span>
                  <strong>18:55 (ES)</strong>
                  <small>04/10/2026</small>
                </div>

                <div className="info-card">
                  <span>REGRESSO · PORTO</span>
                  <strong>18:40 (ES)</strong>
                  <small>04/10/2026</small>
                </div>
              </div>
            </section>

            <section className="ground-section">
              <h3>🏠 ALOJAMENTO</h3>

              <div className="accommodation-card">
                <div>
                  <span>CHECK-IN</span>
                  <strong>
                    02/10 · 16:00–21:00 (ES)
                  </strong>
                </div>

                <div>
                  <span>CHECK-OUT</span>
                  <strong>
                    04/10 · ATÉ ÀS 11:00 (ES)
                  </strong>
                </div>

                <div className="accommodation-address">
                  <span>LOCAL</span>

                  <strong>
                    6 Calle Grupo Reverendo Vicente
                    Garmendi Bajo, Bilbao
                  </strong>

                  <a
                    href={ACCOMMODATION_MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="maintenance-button"
                  >
                    <span>
                      ABRIR LOCALIZAÇÃO
                    </span>

                    <MapPin
                      size={18}
                      strokeWidth={1.8}
                    />
                  </a>
                </div>
              </div>
            </section>

            <section className="ground-section">
              <h3>📋 REGRAS DO CONDOMÍNIO</h3>

              <div className="rules-card">
                <p>
                  🧓 Deixar o avô JPP descansar.
                </p>

                <p>
                  🍻 O resto é responsabilidade da
                  administração.
                </p>
              </div>
            </section>

            <section className="ground-section">
              <h3>🚨 EM CASO DE EMERGÊNCIA</h3>

              <div className="emergency-card">
                <a href="tel:112">
                  <span>🚨 Emergência</span>
                  <strong>112</strong>
                </a>

                <a href="tel:112">
                  <span>🚒 Bomberos Bilbao</span>
                  <strong>112</strong>
                </a>

                <a href="tel:062">
                  <span>👮 Guardia Civil</span>
                  <strong>062</strong>
                </a>

                <a href="tel:+34944204981">
                  <span>
                    🔎 Bilbao Lost &amp; Found
                  </span>
                  <strong>
                    +34 944 204 981
                  </strong>
                </a>
              </div>
            </section>

            <section className="ground-section">
              <h3>👨‍💼 ADMINISTRAÇÃO</h3>

              <div className="responsibles">
                <div>
                  <span>RESPONSÁVEL</span>
                  <strong>Ivo</strong>
                </div>

                <div>
                  <span>RESPONSÁVEL</span>
                  <strong>Routar</strong>
                </div>
              </div>
            </section>

            <div className="ground-warning">
              <strong>
                AVISO DA ADMINISTRAÇÃO
              </strong>

              <span>
                Tenham calma e não matem o noivo JPP.
              </span>
            </div>

            <button
              type="button"
              className="maintenance-button"
              onClick={() => setOpenFloor(null)}
            >
              FECHAR
            </button>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* MODAL — PISO 1 / RALLY PINTXOS */}
      {/* ================================================= */}

      {openFloor?.id === "floor1" && (
        <div
          className="maintenance-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pintxo-title"
          onClick={() => setOpenFloor(null)}
        >
          <div
            className="floor-modal rally-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              aria-label="Fechar"
              className="maintenance-close"
              onClick={() => setOpenFloor(null)}
            >
              <X size={20} />
            </button>

            <div className="floor-modal-icon">
              <Utensils
                size={30}
                strokeWidth={1.5}
              />
            </div>

            <p className="maintenance-level">
              PISO 1 · RALLY PINTXOS
            </p>

            <h2 id="pintxo-title">
              RALLY PINTXOS
            </h2>

            <p className="floor-modal-intro">
              Um percurso gastronómico pelas
              tabernas de pintxos de Bilbao.
            </p>

            <section className="pintxo-hero">
              <div className="pintxo-hero-number">
                🍢
              </div>

              <div>
                <span>
                  OPERAÇÃO CONDOMÍNIO
                </span>

                <strong>
                  PINTXO · BEBIDA · REGRA
                </strong>

                <p>
                  O percurso está preparado.
                  As tabernas esperam por vocês.
                </p>
              </div>
            </section>

            <section className="ground-section">
              <h3>📍 INFORMAÇÃO</h3>

              <div className="rules-card">
                <p>
                  🍢 Várias tabernas de pintxos.
                </p>

                <p>
                  🍺 Várias regras.
                </p>

                <p>
                  🥃 Várias oportunidades para
                  complicar a vida ao condómino.
                </p>

                <p>
                  🏃 O percurso completo está
                  disponível na página do Rally.
                </p>
              </div>
            </section>

            <div className="ground-warning">
              <strong>
                REGRA GERAL DO RALLY
              </strong>

              <span>
                Entra no Rally, segue o percurso
                e tenta chegar ao fim com a
                dignidade intacta.
              </span>
            </div>

            <a
              href="/rally-pintxos"
              className="maintenance-button"
            >
              <span>
                ENTRAR NO RALLY PINTXOS
              </span>

              <Utensils
                size={18}
                strokeWidth={1.8}
              />
            </a>

            <button
              type="button"
              className="maintenance-button"
              onClick={() => setOpenFloor(null)}
            >
              FECHAR
            </button>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* MODAL — PISO 2 / THE CRAFT TABEERNA */}
      {/* ================================================= */}

      {openFloor?.id === "floor2" && (
        <div
          className="maintenance-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="craft-title"
          onClick={() => setOpenFloor(null)}
        >
          <div
            className="floor-modal beer-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              aria-label="Fechar"
              className="maintenance-close"
              onClick={() => setOpenFloor(null)}
            >
              <X size={20} />
            </button>

            <div className="floor-modal-icon">
              <Beer
                size={30}
                strokeWidth={1.5}
              />
            </div>

            <p className="maintenance-level">
              PISO 2 · THE CRAFT TABEERNA
            </p>

            <h2 id="craft-title">
              The Craft Tabeerna
            </h2>

            <p className="floor-modal-intro">
              Uma paragem obrigatória para quem
              acredita que cerveja também pode ser
              assunto sério.
            </p>

            <section className="beer-hero">
              <div className="beer-hero-icon">
                🍺
              </div>

              <div>
                <span>PISO 2</span>

                <strong>
                  THE CRAFT TABEERNA
                </strong>

                <p>
                  Craft beer, ambiente de Bilbao
                  e mais uma excelente oportunidade
                  para perder a conta.
                </p>
              </div>
            </section>

            <section className="ground-section">
              <h3>📍 LOCALIZAÇÃO</h3>

              <div className="rules-card">
                <p>🍺 The Craft Tabeerna</p>

                <p>📍 Bilbao</p>

                <p>
                  🕘 Aberto a partir das 21:00
                  de 02/10.
                </p>
              </div>

              <a
                href={CRAFT_BEER_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="maintenance-button"
              >
                <span>
                  ABRIR LOCALIZAÇÃO
                </span>

                <MapPin
                  size={18}
                  strokeWidth={1.8}
                />
              </a>
            </section>

            <section className="ground-section">
              <h3>
                📋 REGULAMENTO DA TABEERNA
              </h3>

              <div className="rules-card">
                <p>
                  🍺 Experimentar é permitido.
                </p>

                <p>
                  🧑‍🤝‍🧑 Beber acompanhado é
                  recomendado.
                </p>

                <p>
                  🤔 Escolher a cerveja errada
                  também faz parte da experiência.
                </p>

                <p>
                  🧮 Não vale a pena tentar fazer
                  contas ao número de cervejas.
                </p>
              </div>
            </section>

            <div className="ground-warning">
              <strong>
                AVISO DA ADMINISTRAÇÃO
              </strong>

              <span>
                O piso seguinte não fica mais sóbrio
                por estar acima.
              </span>
            </div>

            <button
              type="button"
              className="maintenance-button"
              onClick={() => setOpenFloor(null)}
            >
              FECHAR
            </button>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* MODAL — PISO 3 / CASCO VIEJO */}
      {/* ================================================= */}

      {openFloor?.id === "floor3" && (
        <div
          className="maintenance-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="casco-title"
          onClick={() => setOpenFloor(null)}
        >
          <div
            className="floor-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              aria-label="Fechar"
              className="maintenance-close"
              onClick={() => setOpenFloor(null)}
            >
              <X size={20} />
            </button>

            <div className="floor-modal-icon">
              <Building2
                size={30}
                strokeWidth={1.5}
              />
            </div>

            <p className="maintenance-level">
              PISO 3 · CASCO VIEJO
            </p>

            <h2 id="casco-title">
              Bem-vindos ao Casco Viejo
            </h2>

            <p className="floor-modal-intro">
              O administrador recomenda explorar sem
              mapa, sem pressa e com muito cuidado
              para não acabar num bar maroto.
            </p>

            <section className="beer-hero">
              <div className="beer-hero-icon">
                🌆
              </div>

              <div>
                <span>PISO 3</span>

                <strong>CASCO VIEJO</strong>

                <p>
                  O coração histórico de Bilbao.
                  Ruas estreitas, praças, bares e
                  demasiadas oportunidades para
                  dizer "só mais uma".
                </p>
              </div>
            </section>

            <section className="ground-section">
              <h3>🏛️ CURIOSIDADES</h3>

              <div className="rules-card">
                <p>
                  🏘️ O Casco Viejo é conhecido como
                  as <strong>Sete Ruas</strong>, o
                  núcleo histórico da cidade.
                </p>

                <p>
                  🍢 É uma das zonas mais tradicionais
                  para comer pintxos e beber um copo.
                </p>

                <p>
                  🚶 A melhor forma de o explorar é
                  andar sem destino demasiado definido.
                </p>

                <p>
                  🍻 Há sempre mais um bar a descobrir.
                </p>
              </div>
            </section>

            <section className="ground-section">
              <h3>🎯 DESAFIO DO CONDOMÍNIO</h3>

              <div className="rules-card">
                <p>1️⃣ Entrem no Casco Viejo.</p>
                <p>2️⃣ Percorram as ruas.</p>
                <p>3️⃣ Descubram bares.</p>
                <p>4️⃣ Divirtam-se ao máximo.</p>
                <p>
                  5️⃣ E tentem lembrar-se de onde
                  fica o prédio.
                </p>
              </div>
            </section>

            <div className="ground-warning">
              <strong>
                AVISO DA ADMINISTRAÇÃO
              </strong>

              <span>
                O objetivo é simples: aproveitar
                Bilbao ao máximo. O resto logo se vê.
              </span>
            </div>

            <button
              type="button"
              className="maintenance-button"
              onClick={() => setOpenFloor(null)}
            >
              FECHAR
            </button>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* MODAL — ROOFTOP / PARTY BOAT */}
      {/* ================================================= */}

      {openFloor?.id === "rooftop" && (
        <div
          className="maintenance-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rooftop-title"
          onClick={() => setOpenFloor(null)}
        >
          <div
            className="floor-modal rooftop-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              aria-label="Fechar"
              className="maintenance-close"
              onClick={() => setOpenFloor(null)}
            >
              <X size={20} />
            </button>

            <div className="floor-modal-icon">
              <Ship
                size={30}
                strokeWidth={1.5}
              />
            </div>

            <p className="maintenance-level">
              ROOFTOP · PARTY BOAT
            </p>

            <h2 id="rooftop-title">
              Sim. O rooftop é um barco.
            </h2>

            <p className="floor-modal-intro">
              A administração decidiu que o
              conceito de rooftop tradicional era
              demasiado previsível.
            </p>

            <section className="boat-hero">
              <div className="boat-hero-icon">
                🚤
              </div>

              <div>
                <span>ROOFTOP</span>

                <strong>PARTY BOAT</strong>

                <p>
                  Porque subir até ao último andar
                  só para ficar num terraço seria
                  demasiado fácil.
                </p>
              </div>
            </section>

            <section className="ground-section">
              <h3>🛥️ EMBARQUE</h3>

              <div className="rules-card">
                <p>
                  🕒 <strong>17:00–18:00</strong>
                </p>

                <p>
                  📍 <strong>Plaza Pío Baroja,
                  Bilbao</strong>
                </p>
              </div>

              <a
                href={PARTY_BOAT_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="maintenance-button"
              >
                <span>
                  ABRIR LOCALIZAÇÃO
                </span>

                <MapPin
                  size={18}
                  strokeWidth={1.8}
                />
              </a>
            </section>

            <section className="ground-section">
              <h3>📋 REGRAS DO ROOFTOP</h3>

              <div className="rules-card">
                <p>
                  🚤 Não abandonar o barco.
                </p>

                <p>
                  🧭 Não questionar a rota.
                </p>

                <p>
                  🧑‍✈️ Não discutir com o comandante.
                </p>

                <p>
                  🎶 Se houver música, dança-se.
                </p>

                <p>
                  🍺 Se houver bebida, bebe-se.
                </p>
              </div>
            </section>

            <button
              type="button"
              className="maintenance-button"
              onClick={() => setOpenFloor(null)}
            >
              FECHAR
            </button>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* MODAL — CAVE / CASINO ILEGAL */}
      {/* ================================================= */}

      {openFloor?.id === "basement" && (
        <div
          className="maintenance-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="casino-title"
          onClick={() => setOpenFloor(null)}
        >
          <div
            className="floor-modal casino-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              aria-label="Fechar"
              className="maintenance-close"
              onClick={() => setOpenFloor(null)}
            >
              <X size={20} />
            </button>

            <div className="floor-modal-icon">
              <Trophy
                size={30}
                strokeWidth={1.5}
              />
            </div>

            <p className="maintenance-level">
              CAVE · CASINO ILEGAL
            </p>

            <h2 id="casino-title">
              Bem-vindo ao Casino Ilegal
            </h2>

            <p className="floor-modal-intro">
              O administrador nega oficialmente
              qualquer conhecimento sobre o que
              acontece nesta cave.
            </p>

            <section className="casino-warning">
              <div className="casino-warning-icon">
                ⚠️
              </div>

              <div>
                <span>AVISO</span>

                <p>
                  ESTA ÁREA NÃO EXISTE.
                </p>

                <p>
                  Se alguém perguntar, estiveste
                  sempre no R/C.
                </p>
              </div>
            </section>

            {/* PARÁGRAFO ADICIONAL */}
            <p className="floor-modal-intro">
              A administração recomenda que entres
              apenas se estiveres preparado para
              assumir as consequências das tuas
              próprias decisões.
            </p>

            <section className="ground-section">
              <h3>🎰 JPP LEAGUE</h3>

              <div className="casino-card">
                <div className="casino-card-icon">
                  🎲
                </div>

                <div>
                  <strong>
                    O jogo continua aqui.
                  </strong>

                  <p>
                    Apostas, ranking e decisões
                    questionáveis aguardam-te no
                    Casino Ilegal.
                  </p>
                </div>
              </div>
            </section>

            <a
              href={JPP_LEAGUE_URL}
              target="_blank"
              rel="noreferrer"
              className="maintenance-button"
            >
              <span>
                ENTRAR NO CASINO
              </span>

              <ExternalLink
                size={18}
                strokeWidth={1.8}
              />
            </a>

            <div className="ground-warning">
              <strong>
                A ADMINISTRAÇÃO DECLINA
                RESPONSABILIDADES
              </strong>

              <span>
                Boa sorte. Vais precisar.
              </span>
            </div>

            <button
              type="button"
              className="maintenance-button"
              onClick={() => setOpenFloor(null)}
            >
              FECHAR
            </button>
          </div>
        </div>
      )}
    </main>
  );
}