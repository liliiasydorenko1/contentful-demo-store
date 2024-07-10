import classNames from 'classnames';

export default function TextBlock({
  title,
  text,
  backgroundColor
}) {
  return (
    <div className={classNames("bannerGridCol mb-6 h-full xl:p-0 p-4", backgroundColor && "p-4 xl:p-4")} style={backgroundColor && {backgroundColor: backgroundColor}}>
      <h3 className="text-3xl font-semibold mb-4">{title}</h3>
      {text && text.map((paragraph) => {
        return <p className="text-sm mb-4">{paragraph.content[0].value}</p>
      })}
    </div>
  );
}
