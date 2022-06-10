 

export type RoundImageProps = {
  imageUri: string;
  altText: string;
};

const RoundImage = ({ imageUri, altText }: RoundImageProps) => (
  <div className="w-9">
    <img
      className="border-2 border-white rounded-full"
      alt={altText}
      src={imageUri}
      width={40}
      height={40}
    />
  </div>
);

export default RoundImage;
