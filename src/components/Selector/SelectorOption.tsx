import React from "react";

/**
 * Properties of Selector's Option object
 */
interface Props {
  /**
   * @param children ReactElement to be displayed when Step is active
   */
  children: React.ReactNode;
  /**
   * @param disabled - If true, option is disabled.
   */
  disabled?: boolean | false;
  /**
   * @param label - Label displayed in selector when option is chosen. Not needed if Selector's `displayLabelOnSelect` is set to true.
   */
  label?: string;
  /**
   * @param selected - String to be shown when option is selected (default is label).
   */
  selected?: string;
  /**
   * @param value - Keyword/keywords that option can be found by in selector.
   */
  value: string | number;
}

export default function SelectorOption(props: Props): JSX.Element {
  return <span>{props.children}</span>;
}
