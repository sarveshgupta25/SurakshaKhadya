'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  Boxes,
  Check,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  CloudSun,
  FileCheck2,
  Leaf,
  MapPin,
  Menu,
  PackageCheck,
  QrCode,
  ScanLine,
  ShieldCheck,
  ShoppingBasket,
  Sparkles,
  Store,
  Truck,
  UserRound,
  UsersRound,
  X,
  type LucideIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Batch,
  BatchStatus,
  LabStatus,
  Role,
  batches,
  farmerBatches,
  getBatch,
  ownerBatches,
  roleLabels,
  rolePeople,
} from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/farmer', label: 'Farmer', icon: Leaf },
  { href: '/aggregator', label: 'Aggregator', icon: Boxes },
  { href: '/distributor', label: 'Distributor', icon: Truck },
  { href: '/retailer', label: 'Retailer', icon: Store },
  { href: '/regulator', label: 'Regulator', icon: ShieldCheck },
];

const roleIcons: Record<Role, LucideIcon> = {
  farmer: Leaf,
  aggregator: Boxes,
  distributor: Truck,
  retailer: Store,
  regulator: ShieldCheck,
};

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3">
      <span className={cn('flex h-10 w-10 items-center justify-center rounded-xl shadow-sm transition-transform group-hover:rotate-3', light ? 'bg-white/15 text-white' : 'bg-primary text-primary-foreground')}>
        <Leaf className="h-5 w-5" />
      </span>
      <span className={cn('font-display text-lg font-extrabold tracking-tight', light ? 'text-white' : 'text-foreground')}>
        Suraksa<span className={light ? 'text-emerald-200' : 'text-primary'}>Khadya</span>
      </span>
    </Link>
  );
}

export function StatusBadge({ status }: { status: BatchStatus }) {
  const styles: Record<BatchStatus, string> = {
    SAFE: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    'IN TRANSIT': 'border-sky-200 bg-sky-50 text-sky-800',
    'PENDING TEST': 'border-amber-200 bg-amber-50 text-amber-900',
    RECALLED: 'border-red-200 bg-red-50 text-red-800',
  };
  const icon = status === 'SAFE' ? <BadgeCheck className="h-3.5 w-3.5" /> : status === 'RECALLED' ? <X className="h-3.5 w-3.5" /> : <Clock3 className="h-3.5 w-3.5" />;
  return <Badge variant="outline" className={cn('gap-1.5 px-2.5 py-1 text-[11px] font-bold tracking-wide', styles[status])}>{icon}{status}</Badge>;
}

export function LabBadge({ status }: { status: LabStatus }) {
  const styles: Record<LabStatus, string> = {
    Passed: 'text-emerald-700', Pending: 'text-amber-700', Failed: 'text-red-700',
  };
  return <span className={cn('inline-flex items-center gap-1.5 text-sm font-semibold', styles[status])}><span className={cn('h-2 w-2 rounded-full', status === 'Passed' ? 'bg-emerald-500' : status === 'Pending' ? 'bg-amber-500' : 'bg-red-500')} />{status}</span>;
}

export function AppHeader({ active }: { active?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
    <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 lg:px-10">
      <Logo />
      <nav className="hidden items-center gap-1 lg:flex">
        {navItems.map((item) => <Link key={item.href} href={item.href} className={cn('rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-accent hover:text-accent-foreground', active === item.label ? 'bg-accent text-accent-foreground' : 'text-muted-foreground')}><item.icon className="mr-2 inline-block h-4 w-4" />{item.label}</Link>)}
        <Link href="/track" className={cn('ml-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-accent hover:text-accent-foreground', active === 'Track' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground')}><ScanLine className="mr-2 inline-block h-4 w-4" />Track a batch</Link>
      </nav>
      <div className="hidden items-center gap-3 sm:flex"><button className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label="Notifications"><Bell className="h-5 w-5" /></button><div className="flex items-center gap-2 rounded-full border bg-card py-1.5 pl-1.5 pr-3"><div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">RP</div><span className="text-sm font-semibold">Ramesh Patil</span></div></div>
      <button className="rounded-lg p-2 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">{menuOpen ? <X /> : <Menu />}</button>
    </div>
    {menuOpen && <div className="border-t bg-card px-5 py-3 lg:hidden">{navItems.map((item) => <Link key={item.href} href={item.href} className="block border-b py-3 text-sm font-semibold last:border-0"><item.icon className="mr-2 inline-block h-4 w-4" />{item.label}</Link>)}<Link href="/track" className="block py-3 text-sm font-semibold"><ScanLine className="mr-2 inline-block h-4 w-4" />Track a batch</Link></div>}
  </header>;
}

function PageIntro({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p><h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p></div>{action}</div>;
}

function StatCard({ label, value, helper, icon: Icon, tone = 'green' }: { label: string; value: string; helper: string; icon: LucideIcon; tone?: 'green' | 'amber' | 'red' | 'blue' }) {
  const tones = { green: 'bg-emerald-50 text-emerald-700', amber: 'bg-amber-50 text-amber-700', red: 'bg-red-50 text-red-700', blue: 'bg-sky-50 text-sky-700' };
  return <Card className="overflow-hidden transition-shadow hover:shadow-md"><CardContent className="flex items-start justify-between p-5"><div><p className="text-sm font-medium text-muted-foreground">{label}</p><p className="mt-2 font-display text-3xl font-extrabold tracking-tight">{value}</p><p className="mt-1 text-xs text-muted-foreground">{helper}</p></div><span className={cn('flex h-10 w-10 items-center justify-center rounded-xl', tones[tone])}><Icon className="h-5 w-5" /></span></CardContent></Card>;
}

function QRPlaceholder({ batchId, compact = false }: { batchId: string; compact?: boolean }) {
  return <div className={cn('flex items-center gap-3 rounded-xl border border-dashed border-primary/30 bg-primary/[0.03]', compact ? 'p-2' : 'p-3')}><div className={cn('grid shrink-0 grid-cols-5 gap-0.5 rounded bg-white p-1.5 shadow-sm', compact ? 'h-11 w-11' : 'h-16 w-16')}>{Array.from({ length: 25 }).map((_, index) => <span key={index} className={cn('rounded-[1px]', [0,1,2,4,5,7,9,10,12,14,15,16,18,20,21,22,24].includes(index) ? 'bg-primary' : 'bg-transparent')} />)}</div>{!compact && <div><p className="text-xs font-bold text-primary">Batch QR</p><p className="mt-0.5 text-[11px] text-muted-foreground">Scan to view traceability</p><p className="mt-1 text-[10px] font-semibold tracking-wider text-foreground">{batchId}</p></div>}</div>;
}

function BatchRow({ batch, action }: { batch: Batch; action?: React.ReactNode }) {
  return <div className="grid gap-4 border-b px-5 py-4 transition-colors last:border-0 hover:bg-muted/30 md:grid-cols-[1.6fr_1fr_1fr_1fr_auto] md:items-center"><div className="flex items-center gap-3"><QRPlaceholder batchId={batch.id} compact /><div><Link href={`/track?id=${batch.id}`} className="font-bold text-foreground hover:text-primary hover:underline">{batch.id}</Link><p className="mt-0.5 text-xs text-muted-foreground">{batch.crop} · {batch.variety}</p></div></div><div><p className="text-xs text-muted-foreground md:hidden">Quantity</p><p className="text-sm font-semibold">{batch.quantity}</p></div><div><p className="text-xs text-muted-foreground md:hidden">Location</p><p className="flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{batch.location.split(',')[0]}</p></div><div><p className="mb-1 text-xs text-muted-foreground md:hidden">Status</p><StatusBadge status={batch.status} /></div><div className="flex justify-end">{action}</div></div>;
}

export function BatchTable({ items, actionLabel = 'View batch', onAction }: { items: Batch[]; actionLabel?: string; onAction?: (batch: Batch) => void }) {
  return <Card className="overflow-hidden"><div className="hidden grid-cols-[1.6fr_1fr_1fr_1fr_auto] border-b bg-muted/30 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground md:grid"><span>Batch details</span><span>Quantity</span><span>Current location</span><span>Safety status</span><span /></div>{items.map((batch) => <BatchRow key={batch.id} batch={batch} action={<Button variant="ghost" size="sm" className="gap-1 text-primary" onClick={() => onAction?.(batch)}>{actionLabel}<ChevronRight className="h-4 w-4" /></Button>} />)}</Card>;
}

export function TransferDialog({ batch, onClose, onTransfer }: { batch: Batch; onClose: () => void; onTransfer: (batch: Batch, nextOwner: string) => void }) {
  const [nextOwner, setNextOwner] = useState('');
  const options = batch.ownerRole === 'aggregator' ? ['Western Route Logistics', 'Deccan Distribution'] : batch.ownerRole === 'distributor' ? ['GreenBasket Retail', 'MetroMart Stores'] : ['Sahyadri Fresh Hub'];
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"><div className="w-full max-w-md animate-fade-in-up rounded-2xl border bg-card p-6 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-primary">Chain of custody</p><h2 className="mt-1 font-display text-xl font-extrabold">Transfer this batch</h2></div><button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"><X className="h-5 w-5" /></button></div><div className="mt-5 rounded-xl bg-muted/60 p-4"><p className="font-bold">{batch.id}</p><p className="mt-1 text-sm text-muted-foreground">{batch.crop} · {batch.quantity}</p><div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><span className="font-semibold text-foreground">{batch.currentOwner}</span><ArrowRight className="h-3.5 w-3.5" /><span>Select recipient</span></div></div><label className="mt-5 block text-sm font-semibold">Transfer to<select value={nextOwner} onChange={(event) => setNextOwner(event.target.value)} className="mt-2 flex h-10 w-full rounded-md border bg-background px-3 text-sm"><option value="">Choose next owner</option>{options.map((option) => <option key={option}>{option}</option>)}</select></label><Button className="mt-5 w-full" disabled={!nextOwner} onClick={() => { onTransfer(batch, nextOwner); onClose(); }}><PackageCheck className="mr-2 h-4 w-4" />Confirm transfer</Button></div></div>;
}

export function Timeline({ batch }: { batch: Batch }) {
  return <div className="relative space-y-0">{batch.journey.map((step, index) => { const Icon = roleIcons[step.role.toLowerCase() as Role] ?? PackageCheck; const last = index === batch.journey.length - 1; return <div key={`${step.role}-${step.timestamp}`} className="relative flex gap-4 pb-7 last:pb-0"><div className="relative flex w-10 shrink-0 justify-center"><div className={cn('z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-card', last ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-emerald-100 text-primary')}><Icon className="h-4 w-4" /></div>{!last && <div className="absolute top-10 h-full w-px bg-emerald-200" />}</div><div className="min-w-0 flex-1 rounded-xl border bg-card p-3.5 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-2"><div><p className="text-sm font-bold">{step.role} <span className="font-normal text-muted-foreground">· {step.name}</span></p><p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{step.location}</p></div><span className="text-xs font-medium text-muted-foreground">{step.timestamp}</span></div><p className="mt-2 text-xs text-muted-foreground">{step.note}</p></div></div>; })}</div>;
}

export function DashboardLayout({ role, children }: { role: Role; children: React.ReactNode }) {
  const person = rolePeople[role];
  return <><AppHeader active={roleLabels[role]} /><main className="mx-auto min-h-[calc(100vh-72px)] max-w-[1440px] px-5 py-8 lg:px-10 lg:py-10"><div className="mb-8 flex items-center justify-between"><div className="flex items-center gap-2 text-xs font-medium text-muted-foreground"><Link href="/" className="hover:text-primary">Home</Link><ChevronRight className="h-3 w-3" /><span>{roleLabels[role]} dashboard</span></div><div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />Demo environment · Data updates locally</div></div>{children}</main></>;
}

export function LandingPage() {
  return <div className="min-h-screen bg-background"><header className="relative z-10"><div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 lg:px-10"><Logo /><div className="flex items-center gap-3"><Link href="/track" className="hidden text-sm font-semibold text-muted-foreground transition-colors hover:text-primary sm:block">Track a batch</Link><Link href="/farmer"><Button variant="outline" className="border-primary/20 text-primary hover:bg-accent">Login <ArrowRight className="ml-2 h-4 w-4" /></Button></Link></div></div></header><section className="relative overflow-hidden bg-hero-leaf"><div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" /><div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 pb-20 pt-12 lg:grid-cols-[1fr_0.9fr] lg:px-10 lg:pb-28 lg:pt-20"><div className="animate-fade-in-up"><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800"><Sparkles className="h-3.5 w-3.5" />SIH 2026 · SW-17 Prototype</div><h1 className="max-w-3xl font-display text-5xl font-extrabold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">Every bite has a <span className="text-primary">story.</span><br /><span className="text-muted-foreground">Make it a safe one.</span></h1><p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">SuraksaKhadya brings complete farm-to-fork visibility to India&apos;s perishable food supply chain — from harvest to your kitchen.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/track"><Button size="lg" className="h-12 px-6 shadow-lg shadow-primary/20">Track a batch <ArrowRight className="ml-2 h-4 w-4" /></Button></Link><Link href="/farmer"><Button size="lg" variant="outline" className="h-12 border-primary/20 bg-white/70 px-6">Explore the demo</Button></Link></div><div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground"><div className="flex -space-x-2"><span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-emerald-100 text-[9px] font-bold text-emerald-800">RP</span><span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-amber-100 text-[9px] font-bold text-amber-800">SF</span><span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-sky-100 text-[9px] font-bold text-sky-800">WR</span></div><span>Connected across the entire food journey</span></div></div><div className="relative animate-fade-in-up [animation-delay:150ms]"><div className="relative mx-auto max-w-md"><div className="absolute -inset-5 rounded-[2rem] bg-emerald-100/50 blur-2xl" /><Card className="relative overflow-hidden border-emerald-100 shadow-2xl shadow-emerald-900/10"><div className="flex items-center justify-between border-b bg-emerald-50/70 px-5 py-4"><div><p className="text-xs font-bold uppercase tracking-wider text-primary">Live batch passport</p><p className="mt-1 font-display text-xl font-extrabold">SK-26-08041</p></div><StatusBadge status="SAFE" /></div><CardContent className="p-5"><div className="mb-5 flex items-center justify-between"><div><p className="text-2xl font-extrabold">Hybrid Roma</p><p className="mt-1 text-sm text-muted-foreground">Tomatoes · 2,400 kg</p></div><div className="rounded-xl bg-primary/10 p-3 text-primary"><ShoppingBasket className="h-6 w-6" /></div></div><div className="space-y-3">{['Ramesh Patil Farms', 'Sahyadri Fresh Hub', 'Western Route Logistics', 'GreenBasket Retail'].map((name, index) => <div key={name} className="flex items-center gap-3"><div className={cn('flex h-8 w-8 items-center justify-center rounded-full', index === 3 ? 'bg-primary text-white' : 'bg-emerald-100 text-primary')}>{index === 0 ? <Leaf className="h-3.5 w-3.5" /> : index === 1 ? <Boxes className="h-3.5 w-3.5" /> : index === 2 ? <Truck className="h-3.5 w-3.5" /> : <Store className="h-3.5 w-3.5" />}</div><div className="flex-1"><p className="text-xs font-bold">{name}</p><div className="mt-1 h-1 rounded-full bg-muted"><div className="h-1 rounded-full bg-primary" style={{ width: `${(index + 1) * 25}%` }} /></div></div><Check className="h-4 w-4 text-primary" /></div>)}</div><div className="mt-6 flex items-center justify-between rounded-xl bg-muted/60 px-3 py-2.5"><span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"><MapPin className="h-3.5 w-3.5" />Pune, Maharashtra</span><span className="text-xs font-bold text-primary">Verified 2h ago</span></div></CardContent></Card><div className="absolute -bottom-5 -left-6 hidden items-center gap-3 rounded-xl border bg-card p-3 shadow-xl sm:flex"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-700"><FileCheck2 className="h-4 w-4" /></span><div><p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Lab result</p><p className="text-sm font-extrabold text-emerald-700">All clear</p></div></div></div></div></div></section><section className="border-y bg-card"><div className="mx-auto grid max-w-[1440px] divide-y px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-10">{[['12,840+', 'batches traced', 'Since pilot launch'], ['98.7%', 'safety compliance', 'Across tested produce'], ['42', 'active partners', 'Farm to retail network']].map(([value, label, sub]) => <div key={label} className="px-4 py-7 text-center sm:py-9"><p className="font-display text-3xl font-extrabold text-primary">{value}</p><p className="mt-1 text-sm font-bold">{label}</p><p className="mt-1 text-xs text-muted-foreground">{sub}</p></div>)}</div></section><section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10"><div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">One connected chain</p><h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Trust, from soil to shelf.</h2><p className="mt-4 max-w-md leading-7 text-muted-foreground">Every handoff is recorded, every test is visible, and every consumer can verify the journey.</p></div><div className="grid gap-4 sm:grid-cols-3">{[['01', 'Capture', 'Farmers create a digital passport at harvest.'], ['02', 'Verify', 'Quality tests travel with every batch.'], ['03', 'Assure', 'Consumers scan and shop with confidence.']].map(([number, title, copy]) => <Card key={number} className="border-border/70 bg-muted/20 p-5"><span className="text-xs font-extrabold text-primary">{number}</span><h3 className="mt-8 font-display text-lg font-extrabold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></Card>)}</div></div></section><footer className="border-t bg-slate-950 text-slate-300"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-5 px-5 py-8 sm:flex-row sm:items-center lg:px-10"><Logo light /><p className="text-xs text-slate-400">An SIH 2026 hackathon prototype · Built for safer food systems</p></div></footer></div>;
}

export function FarmerDashboard() {
  const [items, setItems] = useState(farmerBatches);
  const [showCreate, setShowCreate] = useState(false);
  const [created, setCreated] = useState(false);
  const addBatch = () => { setItems((current) => [{ ...farmerBatches[0], id: 'SK-26-08044', crop: 'Coriander', variety: 'Fresh Bunch', quantity: '120 kg', status: 'PENDING TEST', labStatus: 'Pending', currentOwner: 'Ramesh Patil Farms', ownerRole: 'farmer', location: 'Nashik, Maharashtra' }, ...current]); setCreated(true); setShowCreate(false); };
  return <DashboardLayout role="farmer"><PageIntro eyebrow="Farmer workspace" title="Good morning, Ramesh" description="Create and manage digital passports for the produce leaving your farm." action={<Button className="shadow-md shadow-primary/15" onClick={() => setShowCreate(true)}><Leaf className="mr-2 h-4 w-4" />Create new batch</Button>} />{created && <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800"><Check className="h-4 w-4" />New coriander batch created. Your batch passport is ready.</div>}<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><StatCard label="My batches" value={String(items.length)} helper="+1 this week" icon={Boxes} /><StatCard label="Safe produce" value="92%" helper="Across active batches" icon={BadgeCheck} tone="green" /><StatCard label="Total volume" value="2.9T" helper="Currently in network" icon={BarChart3} tone="blue" /><StatCard label="Pending action" value="1" helper="Lab test required" icon={Clock3} tone="amber" /></div><div className="mt-8 grid gap-6 xl:grid-cols-[1fr_340px]"><div><div className="mb-4 flex items-center justify-between"><div><h2 className="font-display text-xl font-extrabold">Your batches</h2><p className="mt-1 text-sm text-muted-foreground">Digital passports created from your farm</p></div><Button variant="ghost" size="sm" className="text-primary">View all <ArrowRight className="ml-1 h-4 w-4" /></Button></div><BatchTable items={items} actionLabel="View" /></div><Card className="h-fit bg-slate-950 text-white"><CardHeader><div className="flex items-center justify-between"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300"><CloudSun className="h-5 w-5" /></div><span className="text-xs font-semibold text-slate-400">Nashik · 28°C</span></div><CardTitle className="mt-4 text-white">Farm health snapshot</CardTitle><CardDescription className="text-slate-400">Your operation at a glance</CardDescription></CardHeader><CardContent className="space-y-4"><div className="flex items-center justify-between border-t border-white/10 pt-4"><span className="text-sm text-slate-400">Next lab pickup</span><span className="text-sm font-bold">15 Aug, 10:00</span></div><div className="flex items-center justify-between"><span className="text-sm text-slate-400">Traceability score</span><span className="text-sm font-bold text-emerald-300">94 / 100</span></div><div className="h-2 rounded-full bg-white/10"><div className="h-2 w-[94%] rounded-full bg-emerald-400" /></div><Button variant="outline" className="mt-2 w-full border-white/15 bg-white/5 text-white hover:bg-white/10">View farm profile</Button></CardContent></Card></div>{showCreate && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"><div className="w-full max-w-lg rounded-2xl border bg-card p-6 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-primary">New digital passport</p><h2 className="mt-1 font-display text-xl font-extrabold">Create a batch</h2></div><button onClick={() => setShowCreate(false)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"><X className="h-5 w-5" /></button></div><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold">Crop<Input className="mt-2" defaultValue="Coriander" /></label><label className="text-sm font-semibold">Variety<Input className="mt-2" defaultValue="Fresh Bunch" /></label><label className="text-sm font-semibold">Quantity<Input className="mt-2" defaultValue="120 kg" /></label><label className="text-sm font-semibold">Origin<Input className="mt-2" defaultValue="Nashik, Maharashtra" /></label></div><div className="mt-5 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900">Your new batch will be marked <strong>Pending Test</strong> until a lab result is attached.</div><Button className="mt-5 w-full" onClick={addBatch}>Create batch passport</Button></div></div>}</DashboardLayout>;
}

export function PartnerDashboard({ role }: { role: Exclude<Role, 'farmer' | 'regulator'> }) {
  const [selected, setSelected] = useState<Batch | null>(null);
  const [items, setItems] = useState(() => ownerBatches[role].map(getBatch));
  const [notice, setNotice] = useState('');
  const person = rolePeople[role];
  const roleCopy: Record<typeof role, { eyebrow: string; title: string; description: string; next: string }> = { aggregator: { eyebrow: 'Aggregation centre', title: 'Your collection floor', description: 'Receive, verify, and route produce with a complete chain of custody.', next: 'Distributor' }, distributor: { eyebrow: 'Distribution control', title: 'Move food with confidence', description: 'Monitor cold-chain movement and hand off verified batches to retail.', next: 'Retailer' }, retailer: { eyebrow: 'Retail operations', title: 'Your fresh inventory', description: 'Know exactly where every item came from before it reaches the shelf.', next: 'Consumer' } };
  const copy = roleCopy[role];
  const handleTransfer = (batch: Batch, nextOwner: string) => { setItems((current) => current.filter((item) => item.id !== batch.id)); setNotice(`${batch.id} transfer initiated to ${nextOwner}.`); };
  return <DashboardLayout role={role}><PageIntro eyebrow={copy.eyebrow} title={copy.title} description={copy.description} action={<div className="hidden items-center gap-2 rounded-xl border bg-card px-3 py-2 text-sm sm:flex"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{person.initials}</div><div><p className="font-bold">{person.name}</p><p className="text-xs text-muted-foreground">{person.location}</p></div></div>} />{notice && <div className="mb-6 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800"><span className="flex items-center gap-2"><Check className="h-4 w-4" />{notice}</span><button onClick={() => setNotice('')}><X className="h-4 w-4" /></button></div>}<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><StatCard label="In my custody" value={String(items.length)} helper="Batches to action" icon={Boxes} /><StatCard label="Ready to move" value={String(items.filter((item) => item.status !== 'RECALLED').length)} helper="Verified for handoff" icon={PackageCheck} tone="green" /><StatCard label="Needs attention" value={String(items.filter((item) => item.status === 'RECALLED' || item.status === 'PENDING TEST').length)} helper="Review required" icon={CircleHelp} tone="amber" /><StatCard label="This month" value="186" helper="Handoffs completed" icon={BarChart3} tone="blue" /></div><div className="mt-8 grid gap-6 xl:grid-cols-[1fr_360px]"><div><div className="mb-4 flex items-end justify-between"><div><h2 className="font-display text-xl font-extrabold">Batches currently held</h2><p className="mt-1 text-sm text-muted-foreground">Tap any batch to review its custody record.</p></div><span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{items.length} active</span></div><BatchTable items={items} actionLabel="Transfer" onAction={(batch) => setSelected(batch)} /></div><Card className="h-fit"><CardHeader><CardTitle className="flex items-center gap-2 text-lg"><ClipboardCheck className="h-5 w-5 text-primary" />Handoff checklist</CardTitle><CardDescription>Before you transfer a batch</CardDescription></CardHeader><CardContent className="space-y-3">{['Confirm batch ID and quantity', 'Check seal and packaging', 'Verify lab result is attached', 'Record location at handoff'].map((item) => <div key={item} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3 text-sm"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-primary"><Check className="h-3 w-3" /></span>{item}</div>)}<div className="mt-4 border-t pt-4"><p className="text-xs leading-5 text-muted-foreground">Next expected partner</p><p className="mt-1 font-bold">{copy.next}</p><p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />Within Maharashtra network</p></div></CardContent></Card></div>{selected && <TransferDialog batch={selected} onClose={() => setSelected(null)} onTransfer={handleTransfer} />}</DashboardLayout>;
}

export function RegulatorDashboard() {
  const [items, setItems] = useState(batches);
  const [notice, setNotice] = useState('');
  const recall = (batch: Batch) => { setItems((current) => current.map((item) => item.id === batch.id ? { ...item, status: 'RECALLED' } : item)); setNotice(`${batch.id} is now marked recalled across the network.`); };
  return <DashboardLayout role="regulator"><PageIntro eyebrow="Food safety command centre" title="Regulatory overview" description="Monitor every active batch, investigate lab results, and act quickly when safety is at risk." action={<Button variant="outline" className="border-primary/20 text-primary"><FileCheck2 className="mr-2 h-4 w-4" />Export report</Button>} />{notice && <div className="mb-6 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800"><span className="flex items-center gap-2"><X className="h-4 w-4" />{notice}</span><button onClick={() => setNotice('')}><X className="h-4 w-4" /></button></div>}<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><StatCard label="Total batches" value="12,840" helper="Across all partners" icon={Boxes} /><StatCard label="Safe batches" value="12,672" helper="98.7% compliance" icon={BadgeCheck} tone="green" /><StatCard label="Pending tests" value="124" helper="Need lab results" icon={Clock3} tone="amber" /><StatCard label="Active recalls" value={String(items.filter((item) => item.status === 'RECALLED').length)} helper="Requires action" icon={ShieldCheck} tone="red" /></div><div className="mt-8 grid gap-6 xl:grid-cols-[1fr_340px]"><div><div className="mb-4 flex items-end justify-between"><div><h2 className="font-display text-xl font-extrabold">Network batches</h2><p className="mt-1 text-sm text-muted-foreground">Review safety status across the food chain.</p></div><div className="flex gap-2"><Button variant="outline" size="sm">All</Button><Button variant="ghost" size="sm">Flagged</Button></div></div><Card className="overflow-hidden"><div className="grid grid-cols-[1.4fr_1fr_0.8fr_0.9fr_auto] border-b bg-muted/30 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground"><span>Batch</span><span>Current owner</span><span>Lab test</span><span>Status</span><span>Action</span></div>{items.map((batch) => <div key={batch.id} className="grid grid-cols-[1.4fr_1fr_0.8fr_0.9fr_auto] items-center border-b px-5 py-4 text-sm last:border-0 hover:bg-muted/30"><div><Link href={`/track?id=${batch.id}`} className="font-bold hover:text-primary">{batch.id}</Link><p className="mt-1 text-xs text-muted-foreground">{batch.crop} · {batch.quantity}</p></div><span className="text-xs font-medium text-muted-foreground">{batch.currentOwner}</span><LabBadge status={batch.labStatus} /><StatusBadge status={batch.status} /><Button variant="ghost" size="sm" className="text-red-700 hover:bg-red-50 hover:text-red-800" disabled={batch.status === 'RECALLED'} onClick={() => recall(batch)}>{batch.status === 'RECALLED' ? 'Recalled' : 'Recall'}</Button></div>)}</Card></div><Card className="h-fit"><CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Clock3 className="h-5 w-5 text-amber-600" />Recent activity</CardTitle><CardDescription>Latest safety events</CardDescription></CardHeader><CardContent className="space-y-5">{[['SK-26-08041', 'Lab test passed', '2 hours ago', 'green'], ['SK-26-08035', 'Sample collection scheduled', '5 hours ago', 'amber'], ['SK-26-08012', 'Recall issued', 'Yesterday', 'red']].map(([id, event, time, tone]) => <div key={id} className="flex gap-3"><span className={cn('mt-1 h-2.5 w-2.5 shrink-0 rounded-full', tone === 'green' ? 'bg-emerald-500' : tone === 'amber' ? 'bg-amber-500' : 'bg-red-500')} /><div><p className="text-sm font-semibold">{event}</p><p className="mt-1 text-xs text-muted-foreground">{id} · {time}</p></div></div>)}<Button variant="outline" className="w-full">View recall history</Button></CardContent></Card></div></DashboardLayout>;
}

export function TrackPage() {
  const [query, setQuery] = useState('SK-26-08041');
  const [batch, setBatch] = useState(getBatch('SK-26-08041'));
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id');
    if (id) {
      setQuery(id.toUpperCase());
      setBatch(getBatch(id.toUpperCase()));
    }
  }, []);
  const search = () => setBatch(getBatch(query.trim().toUpperCase()));
  return <div className="min-h-screen bg-grid bg-background"><AppHeader active="Track" /><main className="mx-auto max-w-5xl px-5 py-10 lg:px-10 lg:py-14"><div className="mx-auto max-w-2xl text-center"><p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">Public batch passport</p><h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Know what&apos;s on your plate.</h1><p className="mt-4 text-muted-foreground">Enter a batch ID to see its verified journey from the farm to the shelf.</p><div className="mx-auto mt-7 flex max-w-lg gap-2 rounded-xl border bg-card p-2 shadow-lg shadow-emerald-900/5"><Input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && search()} className="h-11 border-0 bg-transparent shadow-none focus-visible:ring-0" placeholder="e.g. SK-26-08041" /><Button className="h-11 shrink-0 px-5" onClick={search}><ScanLine className="mr-2 h-4 w-4" />Track batch</Button></div><p className="mt-3 text-xs text-muted-foreground">Try SK-26-08041, SK-26-08038, or SK-26-08012</p></div><div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]"><Card className="h-fit overflow-hidden border-emerald-100"><div className={cn('p-6 text-white', batch.status === 'RECALLED' ? 'bg-red-700' : 'bg-primary')}><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-white/70">Batch passport</p><h2 className="mt-2 font-display text-2xl font-extrabold">{batch.id}</h2></div><QrCode className="h-9 w-9 text-white/80" /></div><div className="mt-6 flex items-end justify-between"><div><p className="text-3xl font-extrabold">{batch.crop}</p><p className="mt-1 text-sm text-white/75">{batch.variety}</p></div><StatusBadge status={batch.status} /></div></div><CardContent className="space-y-5 p-6"><div className="grid grid-cols-2 gap-x-5 gap-y-5">{[['Quantity', batch.quantity], ['Origin', batch.origin], ['Current owner', batch.currentOwner], ['Harvested', batch.harvestDate]].map(([label, value]) => <div key={label}><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 text-sm font-bold">{value}</p></div>)}</div><div className="border-t pt-5"><div className="flex items-center justify-between"><div><p className="text-xs text-muted-foreground">Laboratory result</p><LabBadge status={batch.labStatus} /></div><div className="text-right"><p className="text-xs text-muted-foreground">Test date</p><p className="mt-1 text-sm font-bold">{batch.testDate}</p></div></div></div><div className={cn('flex items-center gap-3 rounded-xl p-3', batch.status === 'SAFE' ? 'bg-emerald-50 text-emerald-900' : batch.status === 'RECALLED' ? 'bg-red-50 text-red-900' : 'bg-amber-50 text-amber-900')}><ShieldCheck className="h-5 w-5 shrink-0" /><div><p className="text-sm font-bold">{batch.status === 'SAFE' ? 'Safe to consume' : batch.status === 'RECALLED' ? 'Do not consume' : 'Awaiting verification'}</p><p className="mt-0.5 text-xs opacity-75">{batch.status === 'SAFE' ? 'All required checks have passed.' : batch.status === 'RECALLED' ? 'This batch has been flagged by the regulator.' : 'Final safety status will update after testing.'}</p></div></div></CardContent></Card><Card className="p-6 sm:p-8"><div className="mb-7 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-primary">Chain of custody</p><h2 className="mt-1 font-display text-2xl font-extrabold">Farm to fork</h2></div><span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />Verified record</span></div><Timeline batch={batch} /></Card></div></main><footer className="mx-auto max-w-5xl px-5 pb-10 text-center text-xs text-muted-foreground lg:px-10">SuraksaKhadya is an SIH 2026 prototype for food safety traceability.</footer></div>;
}
