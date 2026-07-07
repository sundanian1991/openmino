import { Article, Hero, Lead, Quote, Raw } from "reacticle";
import { SectionIdea } from "./sections/01-idea";
import { SectionJourney } from "./sections/02-journey";
import { SectionProtocol } from "./sections/03-protocol";
import { SectionLenses } from "./sections/04-lenses";
import { SectionPrinciples } from "./sections/05-principles";
import { SectionMapping } from "./sections/06-mapping";
import { SectionModes } from "./sections/07-modes";
import { SectionStop } from "./sections/08-stop";
import { SectionQuality } from "./sections/09-quality";
import { SectionWingChun } from "./sections/10-wingchun";

export function ArticleDoc() {
  return (
    <Article toc width="wide">
      <Hero
        title="思维透镜：25 把看问题的钥匙"
        subtitle="一套带强制门的跨职业认知协议系统——不是 25 个问题模板，是 25 台微型思维算法"
        meta={[
          { label: "主题", value: "thinking-lenses 技能详解" },
          { label: "基础", value: "Scott H. Young · 25 Thinking Tools" },
          { label: "日期", value: "2026-07-07" },
        ]}
      />
      <Lead>
        人的最大思维陷阱，是误以为自己看到的就是全部。查理·芒格说"更多的思维模型意味着更多解决问题的办法"——
        但真正的多视角思考，不是把同一个问题换三套职业标签复述一遍，而是加载 25 套各异的认知协议，
        让它们在同一个问题上真正对撞。这篇文章拆解 <strong>thinking-lenses</strong> 技能的完整运作机制：
        它怎么把"换个角度"这件模糊的事，变成一套带强制门、有质量检查、能反复稳定的工程。
      </Lead>

      <Quote who="Charlie Munger">
        More mental models means you have more ways to solve more problems.
      </Quote>

      <SectionIdea />
      <SectionJourney />
      <SectionProtocol />
      <SectionLenses />
      <SectionPrinciples />
      <SectionMapping />
      <SectionModes />
      <SectionStop />
      <SectionQuality />
      <SectionWingChun />

      {/*
        ─── Colophon ───
        每篇 Beautiful Article 必须保留这一段。
      */}
      <Raw title="">
        <footer
          style={{
            marginTop: "var(--ra-space-7, 3rem)",
            paddingTop: "var(--ra-space-4, 1rem)",
            borderTop: "1px solid var(--ra-color-border, currentColor)",
            color: "var(--ra-color-muted, inherit)",
            fontSize: "var(--ra-text-xs, 0.78rem)",
            textAlign: "center",
            letterSpacing: "0.02em",
            opacity: 0.85,
          }}
        >
          Made with{" "}
          <a
            href="https://github.com/ConardLi/garden-skills"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "inherit",
              textDecoration: "underline",
              textUnderlineOffset: "0.2em",
            }}
          >
            beautiful-article
          </a>{" "}
          · press theme
        </footer>
      </Raw>
    </Article>
  );
}
