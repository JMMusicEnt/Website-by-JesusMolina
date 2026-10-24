import { Link } from 'react-router-dom';
import { resolveSitePath } from '../data/sites';

/** Router <Link> for pages on this domain, plain <a> for pages on the other artist's domain. */
export default function SiteLink({ to, children, ...props }) {
  const target = resolveSitePath(to);
  return target.href ? (
    <a href={target.href} {...props}>{children}</a>
  ) : (
    <Link to={target.to} {...props}>{children}</Link>
  );
}
