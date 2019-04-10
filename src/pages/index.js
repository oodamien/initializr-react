import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import styled, { css } from "styled-components"

import get from "lodash.get"
import set from "lodash.set"

import { Layout, Footer } from "../components/common/layout"
import { RadioGroup, List } from "../components/common/form"
import { Typehead } from "../components/common/typehead"
import { CheckboxList } from "../components/common/checkbox-list"
import { Meta } from "../components/common/meta"

const Block = styled.div`
  display: flex;
`

const BlockLeft = styled.div`
  font-weight: 700;
  width: 280px;
  text-align: right;
  padding: 8px 32px 8px 0;
  flex: 280px 0 0;
  position: relative;
  
  ${({ nopadding }) =>
    nopadding &&
    css`
      padding: 0;
      margin: 0;
      margin-left: 4px;
      flex: 312px 0 0;
      background: #f7f7f7;
    `}
  }
`

const BlockRight = styled.div`
  padding: 8px 0 8px 32px;
  flex: 2;
  max-width: 600px;
  
  ${({ nopadding }) =>
    nopadding &&
    css`
      padding: 0;
      margin-left: 28px;
    `}
  }
`

const BlockRightInput = styled(BlockRight)`
  max-width: 500px;
`

const BlockDependencies = styled.div`
  padding: 8px 0 8px 32px;
  flex: 2;
  max-width: 900px;
`

const InputStyled = styled.input.attrs({
  type: "text",
})`
  display: block;
  border: 0;
  outline: none;
  border-bottom: 3px solid #ebebeb;
  line-height: 16px;
  font-family: Karla, sans-serif;
  font-size: 15px;
  box-sizing: border-box;
  background-clip: padding-box;
  width: 100%;
  padding: 0.35rem 0 0.55rem;
  border-radius: 0;
  background: #fff;
  &:focus {
    border-color: #6db33f;
  }
`

const Label = styled.label`
  color: #706c69;
  font-size: 14px;
  font-weight: lighter;
`

const Control = styled.div`
  line-height: 16px;
  padding-top: 8px;
  & + & {
    padding-top: 16px;
  }
`

const Colset = styled.div`
  display: flex;
  min-height: 300px;
`

const Column = styled.div`
  flex: 1;
  & + & {
    padding-left: 20px;
  }
`

const BlockSubmit = styled.div`
  position: sticky;
  bottom: 0px;
  background: red;
  width: 920px;
  background: white;
  height: 36px;
  padding: 24px 0 28px;
  border-top: 1px solid #ccc;
`

const Button = styled.button`
  color: #222;
  padding: 0px 12px;

  border: 2px solid #e4e4e4;
  background-color: #fff;
  border-radius: 4px;
  font-family: Karla, sans-serif;
  font-size: 15px;
  font-weight: 400;
  cursor: pointer;
  line-height: 32px;
  :hover {
    border: 2px solid #d0d0d0;
    background-color: #FFF;
  }
  
  ${({ primary }) =>
    primary &&
    css`
      padding: 4px 32px;
      color: #fff;
      border: 2px solid #6db33f;
      background-color: #6db33f;
      :hover {
        border: 2px solid #5fa82f;
        background-color: #5fa82f;
      }
    `}
  }
`

const MoreBlock = styled.div`
  height: 50px;
  line-height: 16px;
  padding-top: 8px;
  margin-top: 12px;
  & div.wrap {
    border-bottom: 2px dotted #e4e4e4;
    height: 18px;
    text-align: center;
  }
`

const SeeAll = styled.span`
  position: absolute;
  top: 28px;
  right: 35px;
  font-weight: 400;
  width: 100px;
  cursor: pointer;
  text-decoration: underline;
  color: #097dff;
`

const BlockSticky = styled.div`
  position: sticky;
  bottom: 0px;
`

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    const data = this.props.data.allContentJson.edges[0].node
    let values = { ...data.default }
    set(values, "meta.name", get(data, "default.meta.artifact"))
    set(
      values,
      "meta.package",
      `${get(data, "default.meta.group")}.${get(data, "default.meta.artifact")}`
    )
    this.state = {
      dependencies: [],
      toggleDependency: true,
      more: false,
      form: props.data.default,
      ...values,
    }
  }

  dependencyAdd = dependency => {
    console.log("Add: " + dependency.id)
    this.setState({ dependencies: [...this.state.dependencies, dependency] })
  }

  dependencyRemove = dependency => {
    console.log("Remove: " + dependency.id)
    this.setState({
      dependencies: this.state.dependencies.filter(
        item => dependency.name !== item.name
      ),
    })
  }

  toggle = () => {
    this.setState({ more: !this.state.more })
  }

  toggleDependency = () => {
    this.setState({ toggleDependency: !this.state.toggleDependency })
  }

  updateMetaState = (prop, value) => {
    let meta = { ...this.state.meta }
    meta[prop] = value
    this.setState({ meta: meta })
  }

  render() {
    const data = this.props.data.allContentJson.edges[0].node
    let values = this.state.values
    let reduceMode = true
    console.log(this.state)
    return (
      <Layout>
        <Meta
          canonical="canonical"
          title="title"
          description="desc"
          image="image"
        />
        <Block>
          <BlockLeft>Project</BlockLeft>
          <BlockRight>
            <RadioGroup
              name="project"
              selected={this.state.project}
              options={data.project}
              onChange={value => {
                this.setState({ project: value })
              }}
            />
          </BlockRight>
        </Block>
        <Block>
          <BlockLeft>Language</BlockLeft>
          <BlockRight>
            <RadioGroup
              name="language"
              selected={this.state.language}
              onChange={value => {
                this.setState({ language: value })
              }}
              options={data.language}
            />
          </BlockRight>
        </Block>
        <Block>
          <BlockLeft>Spring Boot</BlockLeft>
          <BlockRight>
            <RadioGroup
              name="boot"
              selected={this.state.boot}
              options={data.boot}
              onChange={value => {
                this.setState({ boot: value })
              }}
            />
          </BlockRight>
        </Block>
        <Block>
          <BlockLeft>Project Metadata</BlockLeft>
          <BlockRightInput>
            <Control>
              <Label>Group</Label>
              <InputStyled
                defaultValue={this.state.meta.group}
                onChange={value => {
                  this.updateMetaState("group", event.target.value)
                }}
              />
            </Control>
            <Control>
              <Label>Artifact</Label>
              <InputStyled
                defaultValue={this.state.meta.artifact}
                onChange={value => {
                  this.updateMetaState("artifact", event.target.value)
                }}
              />
            </Control>
            {this.state.more && (
              <div>
                <Control>
                  <Label>Name</Label>
                  <InputStyled
                    defaultValue={this.state.meta.name}
                    onChange={value => {
                      this.updateMetaState("name", event.target.value)
                    }}
                  />
                </Control>
                <Control>
                  <Label>Description</Label>
                  <InputStyled
                    defaultValue={this.state.meta.description}
                    onChange={value => {
                      this.updateMetaState("description", event.target.value)
                    }}
                  />
                </Control>
                <Control>
                  <Label>Package Name</Label>
                  <InputStyled
                    defaultValue={this.state.meta.package}
                    onChange={value => {
                      this.updateMetaState("package", event.target.value)
                    }}
                  />
                </Control>
                <Control>
                  <Label>Packaging</Label>
                  <div>
                    <RadioGroup
                      name="packaging"
                      selected={this.state.meta.packaging}
                      options={data.meta.packaging}
                      onChange={value => {
                        this.updateMetaState("packaging", value)
                      }}
                    />
                  </div>
                </Control>
                <Control>
                  <Label>Java</Label>
                  <div>
                    <RadioGroup
                      name="java"
                      selected={this.state.meta.java}
                      options={data.meta.java}
                      onChange={value => {
                        this.updateMetaState("java", value)
                      }}
                    />
                  </div>
                </Control>
              </div>
            )}
            <MoreBlock>
              <div className="wrap">
                {!this.state.more ? (
                  <Button onClick={this.toggle}>More options</Button>
                ) : (
                  <Button onClick={this.toggle}>Fewer options</Button>
                )}
              </div>
            </MoreBlock>
          </BlockRightInput>
        </Block>
        {!this.state.toggleDependency ? (
          <Block>
            <BlockLeft>
              Dependencies
              <SeeAll onClick={this.toggleDependency}>View all</SeeAll>
            </BlockLeft>
            <BlockDependencies>
              <Colset>
                <Column>
                  <Label>Search dependencies to add</Label>
                  <Typehead
                    boot={this.state.boot}
                    add={this.dependencyAdd}
                    options={data.dependencies}
                    exclude={this.state.dependencies}
                  />
                </Column>
                <Column>
                  {this.state.dependencies.length > 0 && (
                    <>
                      Selected dependencies
                      <List
                        boot={this.state.boot}
                        remove={this.dependencyRemove}
                        list={this.state.dependencies}
                      />
                    </>
                  )}
                </Column>
              </Colset>
            </BlockDependencies>
          </Block>
        ) : (
          <Block>
            <BlockLeft>
              Dependencies
              <SeeAll onClick={this.toggleDependency}>Search</SeeAll>
            </BlockLeft>
            <BlockDependencies>
              <CheckboxList
                boot={this.state.boot}
                add={this.dependencyAdd}
                remove={this.dependencyRemove}
                list={data.dependencies}
                checked={this.state.dependencies}
              />
            </BlockDependencies>
          </Block>
        )}
        <BlockSticky>
          <Block>
            <BlockLeft nopadding>
              <Footer />
            </BlockLeft>
            <BlockRight nopadding>
              <BlockSubmit>
                <Button primary type="submit">
                  Generate the project - ⌘ + ⏎
                </Button>
              </BlockSubmit>
            </BlockRight>
          </Block>
        </BlockSticky>
      </Layout>
    )
  }
}

export const jsonObject = graphql`
  query {
    allContentJson {
      edges {
        node {
          id
          project {
            key
            text
          }
          language {
            key
            text
          }
          boot {
            key
            text
          }
          meta {
            packaging {
              key
              text
            }
            java {
              key
              text
            }
          }
          default {
            project
            language
            boot
            meta {
              group
              artifact
              description
              packaging
              java
            }
          }
          dependencies {
            id
            name
            group
            weight
            description
            versionRequirement
            versionRange
            keywords
          }
        }
      }
    }
  }
`

export default IndexPage
