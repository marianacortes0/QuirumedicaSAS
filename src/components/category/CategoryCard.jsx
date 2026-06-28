import { Link } from 'react-router-dom';
import {
  Scissors,
  Grip,
  Slice,
  Ruler,
  Syringe,
  ShieldCheck,
  ArrowUpRight,
  Boxes,
  Bone,
} from 'lucide-react';

const ICONS = {
  scissors: Scissors,
  grip: Grip,
  slice: Slice,
  ruler: Ruler,
  syringe: Syringe,
  'shield-check': ShieldCheck,
  boxes: Boxes,
  bone: Bone,
};

// Pure category tile → links into the shop pre-filtered by category.
export function CategoryCard({ category, count }) {
  const Icon = ICONS[category.icon] ?? Boxes;

  return (
    <Link
      to={`/tienda?categoria=${category.id}`}
      className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-line bg-surface p-6 pl-7 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-xl hover:shadow-primary/5 motion-reduce:hover:translate-y-0"
    >
      {/* Distinct from product cards: a measuring stop grows down the
          inline edge instead of the card lifting. */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100"
      />
      <div className="flex items-start justify-between">
        <span className="grid size-12 place-items-center rounded-xl bg-primary/5 text-primary transition-colors group-hover:bg-accent group-hover:text-white">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <ArrowUpRight className="size-5 text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" aria-hidden="true" />
      </div>

      <div>
        <div className="flex items-baseline gap-2">
          <h3 className="font-display text-xl font-semibold text-primary">
            {category.name}
          </h3>
          {typeof count === 'number' && (
            <span className="font-mono text-xs text-muted">
              {count.toString().padStart(2, '0')}
            </span>
          )}
        </div>
        <p className="eyebrow mt-1 !text-muted !normal-case !tracking-normal">
          {category.tagline}
        </p>
      </div>

      <p className="text-sm leading-relaxed text-muted">{category.description}</p>
    </Link>
  );
}
