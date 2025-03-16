'use client';

import MuiLink, { type LinkProps as MuiLinkProps } from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const StyledAnchor = styled('a')({});

interface CustomLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'color'>,
    Omit<MuiLinkProps, 'href' | 'color'>,
    Omit<NextLinkProps, 'href' | 'as'> {
  href: NextLinkProps['href'];
  activeClassName?: string;
  noLinkStyle?: boolean;
  as?: NextLinkProps['as'];
  scroll?: boolean;
  shallow?: boolean;
  replace?: boolean;
  prefetch?: boolean;
  locale?: string;
  color?: MuiLinkProps['color'];
}

const Link = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(function Link(props, ref) {
  const {
    href,
    as,
    scroll = true,
    shallow = false,
    replace = false,
    prefetch = false,
    locale,
    noLinkStyle = false,
    activeClassName = 'active',
    className,
    color,
    ...other
  } = props;

  const path = usePathname();
  const isActive = typeof href === 'string' && path === href;

  const computedClassName = `${className ?? ''} ${isActive ? activeClassName : ''}`.trim();

  const isExternal =
    typeof href === 'string' &&
    (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:'));

  if (isExternal) {
    if (noLinkStyle) {
      return <StyledAnchor href={href} className={computedClassName} ref={ref} {...other} />;
    }
    return <MuiLink href={href} className={computedClassName} ref={ref} color={color} {...other} />;
  }

  const linkProps = {
    href,
    as,
    scroll,
    shallow,
    replace,
    prefetch,
    locale,
  };

  if (noLinkStyle) {
    return (
      <NextLink {...linkProps} passHref>
        <StyledAnchor ref={ref} className={computedClassName} {...other} />
      </NextLink>
    );
  }

  return (
    <MuiLink
      component={NextLink}
      ref={ref}
      className={computedClassName}
      color={color}
      {...linkProps}
      {...other}
    />
  );
});

export default Link;
