import type { ReactNode } from "react";
import {
  BalanceIcon,
  HomeIcon,
  PeopleIcon,
  BriefcaseIcon,
  ShieldIcon,
  GavelIcon,
  BuildingIcon,
  LandIcon,
  BankIcon,
  CybersIcon,
  DocumentIcon,
  ChatIcon,
  HandshakeIcon,
} from "../components/Icons";

/**
 * Maps the `icon` string stored in Supabase (`practice_areas.icon`,
 * feature/why-choose-us cards) to a rendered icon. Falls back to the scales of
 * justice so an unknown key never renders nothing.
 */
const registry: Record<string, (size: number) => ReactNode> = {
  gavel: (s) => <GavelIcon size={s} />,
  balance: (s) => <BalanceIcon size={s} />,
  scale: (s) => <BalanceIcon size={s} />,
  home: (s) => <HomeIcon size={s} />,
  land: (s) => <LandIcon size={s} />,
  people: (s) => <PeopleIcon size={s} />,
  briefcase: (s) => <BriefcaseIcon size={s} />,
  building: (s) => <BuildingIcon size={s} />,
  shield: (s) => <ShieldIcon size={s} />,
  bank: (s) => <BankIcon size={s} />,
  cyber: (s) => <CybersIcon size={s} />,
  document: (s) => <DocumentIcon size={s} />,
  chat: (s) => <ChatIcon size={s} />,
  handshake: (s) => <HandshakeIcon size={s} />,
};

/**
 * Resolve an icon key to a rendered icon of the given size.
 * @param key icon identifier from the database (may be unknown)
 * @param size pixel size (default 24)
 */
export function renderIcon(key?: string | null, size = 24): ReactNode {
  const factory = (key && registry[key]) || registry.balance;
  return factory(size);
}
