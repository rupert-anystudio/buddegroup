import { useNextSanityImage } from 'next-sanity-image'
import Img from 'next/image'
import { sanityClient } from '../../lib/sanity.server'

const allowedLayouts = ['responsive', 'intrinsic', 'fixed', 'fill']

export const returnRect = (imageUrlBuilder, options) => {
  const { crop } = imageUrlBuilder.options.source
  const { width, height } = options.originalImageDimensions
  if (!crop) return [0, 0, width, height]
  const rectLeft = crop.left * width
  const rectTop = crop.top * height
  const rectWidth = width - rectLeft - (crop.right * width)
  const rectHeight = height - rectTop - (crop.bottom * height)
  return [rectLeft, rectTop, rectWidth, rectHeight].map(v => Math.round(v))
}

export const returnFocalPoint = (imageUrlBuilder) => {
  const { hotspot } = imageUrlBuilder.options.source
  if (!hotspot) return [0.5, 0.5]
  return [hotspot.x, hotspot.y]
}

export const returnWidth = (options) => {
  return options.width || Math.min(options.originalImageDimensions.width, 100)
}

export const returnBlurUpWidth = (options) => {
  return options.width || 64
}

const defaultImageBuilder = (imageUrlBuilder, options) => {
	const width = returnWidth(options)
	const rect = returnRect(imageUrlBuilder, options)
	const focalPoint = returnFocalPoint(imageUrlBuilder)
	return imageUrlBuilder
		.width(width)
		.rect(...rect)
		.focalPoint(...focalPoint)
		.quality(options.quality || 75)
		.fit('clip')
}

const defaultBlurUpImageBuilder = (imageUrlBuilder, options) => {
	const rect = returnRect(imageUrlBuilder, options)
	const focalPoint = returnFocalPoint(imageUrlBuilder)
	return imageUrlBuilder
		.width(options.width || 64)
		.rect(...rect)
		.focalPoint(...focalPoint)
		.quality(options.quality || 40)
		.blur(options.blurAmount || 50)
		.fit('clip')
}

const defaultOptions = {
  blurUpImageWidth: 124,
  blurUpImageQuality: 40,
  blurUpAmount: 24,
}

export const NextSanityImage = ({
	layout: givenLayout,
	options: givenOptions = {},
	imageBuilder: givenImageBuilder,
	blurUpImageBuilder: givenBlurUpImageBuilder,
	sizes,
	image,
	unoptimized = false,
	objectFit = 'cover',
	objectPosition = 'center',
}) => {

	const options = {
		...defaultOptions,
		...givenOptions,
		imageBuilder: givenImageBuilder || defaultImageBuilder,
		blurUpImageBuilder: givenBlurUpImageBuilder || defaultBlurUpImageBuilder,
	}

	const { src, ...imageProps } = useNextSanityImage(
		sanityClient,
		image,
		options,
	)

	const layout = allowedLayouts.includes(givenLayout)
		? givenLayout
		: allowedLayouts[0]

	// weird hack to get rid of nextjs warning
	const srcParams = new URLSearchParams(src)
	const w = srcParams.get('w')
	const fixedSrc = `${src}&width=${w}`

	const sharedProps = {
		src: fixedSrc,
		sizes,
		layout,
		unoptimized,
	}

	if (layout === 'fill') return (
		<Img
			loader={imageProps.loader}
			placeholder={imageProps.placeholder}
			blurDataURL={imageProps.blurDataURL}
			objectFit={objectFit}
			objectPosition={objectPosition}
			{...sharedProps}
		/>
	)

	return (
		<Img
			{...imageProps}
			objectFit={objectFit}
			objectPosition={objectPosition}
			{...sharedProps}
		/>
	)
}