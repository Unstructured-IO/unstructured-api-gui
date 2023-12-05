import type { V2_MetaFunction, ActionArgs } from '@remix-run/node'
import {
	Form,
	useActionData,
	useNavigation,
	useLoaderData,
} from '@remix-run/react'
import { json } from '@remix-run/node'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

import { LinkButton } from '~/components/LinkButton'
import { FormGroup } from '~/components/FormGroup'
import { FileUpload } from '~/components/FileUpload'
import { InputGroup } from '~/components/InputGroup'
import { RadioInputGroup } from '~/components/RadioInputGroup'
import { SubmitButton } from '~/components/SubmitButton'
import { LoadingSpinner } from '~/components/LoadingSpinner'
import { Alert } from '~/components/Alert'
import { OptionsAccordion } from '~/components/OptionsAccordion'
import { CheckboxInput } from '~/components/CheckBoxGroups'
import { TextInput } from '~/components/TextInput'

import { SectionHeading } from '~/components/SectionHeading'
import { FilterMenu } from '~/components/Menu'
import { Stats } from '~/components/Stats'

import { getKeys, getProperty, extractTypes } from '~/utils'
import type {
	DataStats,
	DisplayData,
	ResponseErr,
	TypeStat,
	outputFormat,
} from '~/types'
import { Tabs } from '~/components/Tabs'

export const meta: V2_MetaFunction = () => {
	return [
		{ title: 'Unstructured.io API GUI' },
		{ name: 'description', content: 'ETL for LLMs' },
	]
}

export const loader = async () => {
	return json({ apiKey: process.env.API_KEY })
}

export const action = async ({ request }: ActionArgs) => {
	const form = await request.formData()
	const apiKey = form.get('api_key') as string

	if (!apiKey) {
		return json({ error: { apiKey: 'You need to add an API Key' } })
	}
	try {
		const { data } = await axios.postForm(
			'https://api.unstructured.io/general/v0/general',
			form,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					accept: 'application/json',
					'unstructured-api-key': apiKey,
				},
			},
		)
		return json(data)
	} catch (error) {
		if (axios.isAxiosError(error)) {
			let data: ResponseErr = {
				status: error.status,
				error: error?.response?.data,
			}
			return json(data)
		}
		return json(error)
	}
}

const formatTextData = (data: DisplayData) => {
	if (Array.isArray(data)) {
		const text = data.map(({ text }: { text: string }) => text)
		return text.join('\n')
	}
}

export default function Index() {
	const transition = useNavigation()
	const { apiKey } = useLoaderData<typeof loader>()
	const data = useActionData<typeof action>()
	const [textData, setTextData] = useState<string | undefined | null>(() =>
		Array.isArray(data) ? formatTextData(data) : null,
	)
	const [dataDownload, setDataDownload] = useState<string>('')
	const [dataByType, setDataByType] = useState<Object>({})
	const [dataToExplore, setDataToExplore] = useState<DisplayData>()
	const [outputFormat, setOutputFormat] = useState<outputFormat>('JSON')
	const [dataStats, setDataStats] = useState<DataStats>()
	const [dataTypes, setDataTypes] = useState<(keyof Object)[]>()

	useEffect(() => {
		if (data && !data.error) {
			setDataToExplore(data)
			setTextData(formatTextData(data))
			setOutputFormat('JSON')
		}
	}, [data, setDataToExplore])

	useEffect(() => {
		if (data && !data.error) {
			const newData: Object = extractTypes(data)
			const dataKeys = getKeys(newData)

			const typeStats: TypeStat[] = dataKeys.map((type) => ({
				type: type,
				percent: (getProperty(newData, type).length / data.length) * 100,
				count: getProperty(newData, type).length,
			}))

			const newDataStats: DataStats = {
				total: data.length,
				typeCount: dataKeys.length,
				types: typeStats,
			}

			setDataTypes(dataKeys)
			setDataByType(newData)
			setDataStats(newDataStats)
		}
	}, [data, setDataByType, setDataStats])

	const submitText =
		transition.state === 'submitting'
			? 'Sending...'
			: transition.state === 'loading'
			? 'Processing!'
			: 'Process selected documents'

	const resultPlaceholder =
		transition.state === 'submitting' ? (
			<LoadingSpinner />
		) : (
			<p>
				<i>Upload files to see results</i>
			</p>
		)

	useEffect(() => {
		if (data && outputFormat === 'JSON') {
			const blob = new Blob([JSON.stringify(data)], {
				type: 'application/json',
			})
			const url = URL.createObjectURL(blob)
			setDataDownload(url)
		}

		if (data && outputFormat === 'Text') {
			const blob = new Blob([String(textData)], {
				type: 'text/plain',
			})
			const url = URL.createObjectURL(blob)
			setDataDownload(url)
		}
	}, [data, outputFormat, textData])

	const handleOutputFormat = useCallback(
		() => (format: outputFormat) => {
			if (format === 'Text' && typeof textData === 'string') {
				setDataToExplore(textData)
			}
			if (format === 'JSON') {
				setDataToExplore(data)
			}
			setOutputFormat(format)
		},
		[setDataToExplore, setOutputFormat, textData, data],
	)

	return (
		<div>
			<header className='bg-white shadow'>
				<div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
					<h1 className='text-3xl font-bold tracking-tight text-dark-slate-blue'>
						Unstructured.io API GUI
					</h1>
				</div>
			</header>
			<main className='p-5'>
				{data?.error?.detail && (
					<Alert header='Looks like something went wrong...'>
						<ul className='list-disc space-y-1 pl-5'>
							{data.error.detail.map((err: any, i: number) => {
								return (
									<li key={`error-${err.type}-${i}`}>
										<p className='font-md'>{err.type}</p>
										<p>{err.msg}</p>
									</li>
								)
							})}
						</ul>
					</Alert>
				)}

				{data?.error?.apiKey && (
					<Alert header='Looks like something went wrong...'>
						<ul className='list-disc space-y-1 pl-5'>
							<li>
								<p className='font-md'>{data?.error?.apiKey}</p>
							</li>
						</ul>
					</Alert>
				)}
				<div className='mx-auto max-w-7xl py-1 sm:px-6 lg:px-8'>
					<div className='grid md:grid-cols-2 sm:grid-cols-1 gap-10'>
						<Form
							method='post'
							encType='multipart/form-data'
						>
							<FormGroup disabled={transition.state === 'submitting'}>
								<SectionHeading
									title='Step 1'
									description='Add your Unstructured.io API Key'
								/>
								<InputGroup>
									<TextInput
										required
										defaultValue={apiKey || ''}
										name='api_key'
										label='API Key'
										helper='You can get an api key at https://unstructured.io/#get-api-key'
									/>
								</InputGroup>
								<SectionHeading
									title='Step 2'
									description='Select the files you want to process.'
								/>
								<InputGroup>
									<FileUpload />
								</InputGroup>
								<SectionHeading
									title='Step 3'
									description='Select the strategy for processing your documents.'
								/>
								<InputGroup>
									<RadioInputGroup
										name='strategy'
										legend='Strategy'
										helper='Four strategies are available for processing PDF/Images files: hi_res, fast, ocr_only, and auto. fast is the default strategy and works well for documents that do not have text embedded in images.'
										defaultValue='fast'
										options={[
											{
												value: 'fast',
												label: 'Fast',
												helper: 'Default',
											},
											{
												value: 'hi_res',
												label: 'High Resolution',
												helper:
													'the better choice for PDFs that may have text within embedded images, or for achieving greater precision of element types in the response JSON.',
											},
											{
												value: 'ocr_only',
												label: 'OCR Only',
												helper:
													'Runs the document through Tesseract for OCR. Currently, hi_res has difficulty ordering elements for documents with multiple columns.',
											},
											{
												value: 'auto',
												label: 'Auto',
												helper:
													'The best of all worlds, auto will determine when a page can be extracted using fast or ocr_only mode, otherwise, it will fall back to hi_res.',
											},
										]}
									/>
								</InputGroup>
								<InputGroup>
									<OptionsAccordion label='Optional Settings'>
										<InputGroup>
											<TextInput
												name='encoding'
												label='Encoding'
												helper='You can specify the encoding to use to decode the text input. If no value is provided, utf-8 will be used.'
											/>
										</InputGroup>
										<InputGroup>
											<CheckboxInput
												name='coordinates'
												label='Coordinates'
												helper='When elements are extracted from PDFs or images, it may be useful to get their bounding boxes as well.'
											/>
										</InputGroup>
										<InputGroup>
											<CheckboxInput
												name='pdf_infer_table_structure'
												label='PDF Table Extraction'
												helper='Extract the table structure from PDF files using the hi_res strategy. This setting includes the table’s text content in the response. By default, this parameter is set to false to avoid the expensive reading process.'
											/>
										</InputGroup>
										<InputGroup>
											<CheckboxInput
												name='xml_keep_tags'
												label='Keep XML Tags'
												helper='When processing XML documents, set the xml_keep_tags parameter to true to retain the XML tags in the output. If not specified, it will simply extract the text from within the tags.'
											/>
										</InputGroup>
									</OptionsAccordion>
								</InputGroup>
								<SectionHeading
									title='Step 4'
									description='Submit documents for processing'
								/>
								<InputGroup>
									<SubmitButton
										disabled={transition.state === 'submitting'}
										label={submitText}
									/>
								</InputGroup>
							</FormGroup>
						</Form>
						<div className='col-span-1 mt-5 relative'>
							<SectionHeading
								title='Step 5'
								description='Explore and download the generated JSON.'
							/>
							{data && transition.state === 'idle' && dataStats && (
								<Stats
									label='Distribution of content types'
									stats={dataStats?.types?.map((stat) => {
										return {
											label: stat.type,
											stat: `${stat.percent.toFixed(2)}%`,
										}
									})}
								/>
							)}

							<div className='my-10 pt-16 flex overflow-auto items-center justify-center rounded-b-lg text-sm leading-[1.5714285714] text-white sm:rounded-t-lg language-jsx bg-[#00161c] whitespace-break-spaces h-full max-h-[80vh] relative'>
								{data && transition.state === 'idle' && (
									<div className='absolute z-10 top-5 right-5 flex gap-4'>
										<Tabs
											tabs={['JSON', 'Text']}
											defaultTab='JSON'
											setOutputFormat={handleOutputFormat()}
										/>
										<LinkButton
											href={dataDownload}
											download={true}
											label={`Download output as ${outputFormat}`}
										>
											Download {outputFormat}
										</LinkButton>
									</div>
								)}
								{data &&
									transition.state === 'idle' &&
									outputFormat === 'JSON' &&
									dataTypes && (
										<FilterMenu
											label='Filter'
											items={dataTypes.map((type) => ({
												label: `${type} (${dataByType[type].length})`,
												callback: () =>
													setDataToExplore(getProperty(dataByType, type)),
											}))}
										/>
									)}
								{data && transition.state === 'idle' ? (
									<div
										style={{ backgroundColor: '#00161c' }}
										className='p-5 h-full w-full overflow-auto text-lightest-blue bg-dark-slate-blue'
									>
										{JSON.stringify(dataToExplore, null, 2)}
									</div>
								) : (
									<div>{resultPlaceholder}</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}
