import React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';

class Box extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            result: [],
        };
    }

    ch2pattern = (ch) => {
        const offset = 44032;
        if (/[가-힣]/.test(ch)) {
            const chCode = ch.charCodeAt(0) - offset;
            if (chCode % 28 > 0) {
                return ch;
            }
            const begin = Math.floor(chCode / 28) * 28 + offset;
            const end = begin + 27;
            return `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
        }

        if (/[ㄱ-ㅎ]/.test(ch)) {
            const con2syl = {
                'ㄱ': '가'.charCodeAt(0),
                'ㄲ': '까'.charCodeAt(0),
                'ㄴ': '나'.charCodeAt(0),
                'ㄷ': '다'.charCodeAt(0),
                'ㄸ': '따'.charCodeAt(0),
                'ㄹ': '라'.charCodeAt(0),
                'ㅁ': '마'.charCodeAt(0),
                'ㅂ': '바'.charCodeAt(0),
                'ㅃ': '빠'.charCodeAt(0),
                'ㅅ': '사'.charCodeAt(0),
            }
            const begin = con2syl[ch] || ( ( ch.charCodeAt(0) - 12613 ) * 588 + con2syl['ㅅ']);
            const end = begin + 587;
            return `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
        }

        return this.escapeRegExp(ch);
    }

    createFuzzyMatcher(input) {
        const pattern = input
            .split('')
            .map(this.ch2pattern)
            .map(pattern => '(' + pattern + ')')
            .join('.*?');
        return new RegExp(pattern);
    }

    escapeRegExp = (ch) => {
        const reRegExpChar = /[\\^$.*+?()[\]{}|]/g
        const reHasRegExpChar = RegExp(reRegExpChar.source)
        return (ch && reHasRegExpChar.test(ch))
            ? ch.replace(reRegExpChar, '\\$&')
            : (ch || '')
    }

    onQuery = (event, data) => {
        const text = event.target.value

        this.setState({
            text: text,
        });

        const regex = this.createFuzzyMatcher(text)
        const result = data.allMarkdownRemark.nodes
                    .filter((node) => {
                        return regex.test(node);
                    })
                    .map((node) => {
                        return node
                    })

        this.setState({
            result: result,
        });
    }

    render() {
        return (
            <StaticQuery
                query={graphql`
                query {
                    allMarkdownRemark {
                      nodes {
                        fields {
                          slug
                         }
                         rawMarkdownBody
                      }
                    }
                }
                `}
            render={data => (
                <div>
                <span>Fuzzy Finder :</span>
                <input
                    type="text"
                    name="search"
                    value={this.state.text}
                    onChange={event => this.onQuery(event, data)}
                />
                {this.state.result.length > 0 ? this.state.result.map((key, i) => {
                    return (
                        <div key={i} style={{
                                        background: `lightgrey`,
                                        margin: `5px`,
                                        width: `70%`,
                                        color: `black`,
                                    }}>
                        <Link to={key.fields.slug}>
                          {key.fields.slug}
                        </Link>
                        {key.rawMarkdownBody.split(" ")[0]}
                        </div>
                    )
                }) : <div>"empty"</div>}
                </div>
            )}
            />
        )
    }
}

export default Box;
