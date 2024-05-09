import { TailSpin, ThreeDots, LineWave } from "react-loader-spinner";
export const LoadingUpload = (width, height, color, wrapperClass) => {
  return (
    <TailSpin
      visible={true}
      height={height}
      width={width}
      color={color}
      ariaLabel="tail-spin-loading"
      radius="3"
      wrapperStyle={{}}
      wrapperClass={wrapperClass}
    />
  );
};
export const LoadingGetData = (width, height, color, wrapperClass) => {
  return (
    <ThreeDots
      visible={true}
      height={height}
      width={width}
      color={color}
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass={wrapperClass}
    />
  );
};
export const LoadingCheck = (width, height, color, wrapperClass) => {
  return (
    <LineWave
      visible={true}
      height={height}
      width={width}
      color={color}
      ariaLabel="line-wave-loading"
      wrapperStyle={{}}
      wrapperClass=""
      firstLineColor=""
      middleLineColor=""
      lastLineColor=""
    />
  );
};
