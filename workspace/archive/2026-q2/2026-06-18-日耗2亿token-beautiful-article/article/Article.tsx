import { Article, Hero, Lead, Raw } from "reacticle";
import { SectionOpening } from "./sections/01-opening";
import { SectionLeadership } from "./sections/02-leadership";
import { SectionCost } from "./sections/03-cost";
import { SectionLeverage } from "./sections/04-leverage";
import { SectionConsumption } from "./sections/05-consumption";
import { SectionInvariants } from "./sections/06-invariants";
import { SectionBrain } from "./sections/07-brain";
import { SectionConclusion } from "./sections/08-conclusion";

export function ArticleDoc() {
  return (
    <Article toc width="regular">
      <Hero
        title="日耗2亿token，是脑力工作者的底线。"
        subtitle="The Art of Token：AI时代的兵仙"
        eyebrow="Beautiful Article"
        meta={[
          { label: "作者", value: "奶牛Denny" },
          { label: "来源", value: "微信公众号「奶牛Denny」" },
          { label: "原文", value: "mp.weixin.qq.com" },
        ]}
      />
      <Lead>
        2 亿 token 不到 100 元，但 99% 的人用不掉。问题不是智能太贵，而是你能不能把它真正调用出来。
      </Lead>

      <SectionOpening />
      <SectionLeadership />
      <SectionCost />
      <SectionLeverage />
      <SectionConsumption />
      <SectionInvariants />
      <SectionBrain />
      <SectionConclusion />

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
          · tufte theme
        </footer>
      </Raw>
    </Article>
  );
}
