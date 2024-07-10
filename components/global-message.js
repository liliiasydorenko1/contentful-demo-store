import classNames from 'classnames';

export default function GlobalMessage({
  message,
  backgroundColor,
  link
}) {
  return (
      <div className={classNames("absolute top-0 left-0 w-full flex items-center justify-center p-1 text-white mb-4 text-sm font-semibold")}
           style={{backgroundColor: backgroundColor}}>
        <a  className={classNames(link ? "underline" : '')} href={link}>{message}</a>
      </div>

  );
}
